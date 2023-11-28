import React, { useState } from "react";
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
import Send from "../../assets/img/send-icon.png"
import Clip from "../../assets/img/clip-icon.png"

const SendMessage = ({ scroll, studentId, teacherId }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
      const storageRef = ref(storage, `images/${uid}/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      const chatDocRef = doc(db, "chats", `${teacherId}${studentId}`);
      const chatDocSnapshot = await getDoc(chatDocRef);

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
      setImagePreview(null);
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(selectedImage);
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
          onChange={handleImageChange}
          accept="image/*"
        />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        <button className="sendd" type="button"><img className="icon-send" src={Clip} alt="selec-image" /></button>
      </div>
      <button className="sendd" type="submit"><img className="icon-send" src={Send} alt="send-msg" /></button>
    </form>
  );
};

export default SendMessage;
