/* eslint-disable react/prop-types */
import { useState } from "react";
import { auth, db, storage } from "../../../server/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./SendMessage.css";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

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

    // Guardar el mensaje en la colección "messages"
    await addDoc(collection(db, "messages"), {
      text: message,
      image: imageUrl,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage("");
    setImage(null);
    
    scroll.current.scrollIntoView({ behavior: "smooth" });
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
