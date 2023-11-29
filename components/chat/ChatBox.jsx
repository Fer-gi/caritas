import React, { useEffect, useRef, useState } from "react";
import {doc, onSnapshot, getFirestore } from "firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import "./Chat.css";
const ChatBox = () => {
  const db = getFirestore();
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { studentId, teacherId } = useParams();
  const getTeachersAndStudentsFromWorkshop = async (teacherId, studentId) => {
    try {
      onSnapshot(doc(db, "chats", `${teacherId}${studentId}`), (doc) => {
        console.log("Current data: ", doc.data());
        setMessages(doc.data().messages);
      });
    } catch (error) {
      console.error(
        "Error al obtener los IDs de profesores y estudiantes:",
        error
      );
      return null;
    }
  };
  useEffect(() => {
    getTeachersAndStudentsFromWorkshop(teacherId, studentId);
  }, [studentId, teacherId]);
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  console.log("Firestore Instance:", db);
  console.log("Student ID:", studentId);
  console.log("Teacher ID:", teacherId);
  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <span ref={scroll}></span>
      </div>
      <SendMessage
        scroll={scroll}
        studentId={studentId}
        teacherId={teacherId}
      />
    </main>
  );
};
export default ChatBox;
