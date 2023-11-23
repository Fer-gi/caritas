import { useState } from "react";
import { auth, storage } from "../../../server/firebase/firebase";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp
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
    let imageUrl = null;
    if (image) {
      const storageRef = ref(
        storage,
        `images/${uid}/${Date.now()}_${image.name}`
      );
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    try {
      const chatDocRef = doc(db, "chats", `${teacherId}${studentId}`);
      const chatDocSnapshot = await getDoc(chatDocRef)
      if (!chatDocSnapshot.exists()) {
        await setDoc(chatDocRef, { lastMessage: null, messages: [] });
      }
        await updateDoc(chatDocRef, {
          lastMessage: message,
          messages: arrayUnion({
              text: message,
              image: imageUrl,
              name: displayName,
          }),
        });
        setMessage("");
        setImage(null);
        scroll.current.scrollIntoView({ behavior: "smooth" });
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
        placeholder="Escribe un mensaje..."
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
        <button type="button">Subir imagen</button>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};
export default SendMessage;