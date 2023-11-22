import { useState } from "react";
import { auth, storage } from "../../../server/firebase/firebase";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./SendMessage.css";

const SendMessage = ({ scroll, studentId, teacherId }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const db = getFirestore();

  const sendMessage = async (event) => {
    event.preventDefault();
  
    if (!message.trim() && !image) {
      alert("Enter a message or select an image.");
      return;
    }
  
    const { uid, displayName, photoURL } = auth.currentUser;
  
    // Subir la imagen a Cloud Storage si está presente
    let imageUrl = null;
    if (image) {
      const storageRef = ref(storage, `images/${uid}/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
  
    try {
      // Obtener la referencia al documento del chat
      const chatDocRef = doc(db, "chats", `${studentId}-${teacherId}`);
  
      // Comprobar si el documento de chat ya existe
      const chatDocSnapshot = await chatDocRef.get();
  
      if (!chatDocSnapshot.exists()) {
        // Si el documento no existe, créalo
        await setDoc(chatDocRef, { lastMessage: null });
  
        // Ahora, obtener la referencia a la subcolección "messages" dentro del chat
        const messagesCollectionRef = collection(chatDocRef, "messages");
  
        // Guardar el mensaje en la subcolección "messages"
        await addDoc(messagesCollectionRef, {
          text: message,
          image: imageUrl,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });


        console.log("Firestore Instance:", db);
        console.log("Student ID:", studentId);
        console.log("Teacher ID:", teacherId);
    
  
        // Actualizar el campo lastMessage en el documento del chat
        await updateDoc(chatDocRef, { lastMessage: message });
  
        // Limpiar el input y scroll al último mensaje
        setMessage("");
        setImage(null);
        scroll.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };
  

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="file-input-container">
        <input
          type="file"
          className="file-input"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="button">Add File</button>
      </div>
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
