import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, collection, orderBy, onSnapshot, query, where, getFirestore, setDoc } from "firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import "./Chat.css";

const ChatBox = () => {
  const db = getFirestore();

  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { studentId, teacherId } = useParams();

  

  const getTeachersAndStudentsFromWorkshop = async (workshopId) => {
    try {
      const workshopDocRef = doc(db, "workshops", workshopId);
      const workshopDocSnapshot = await getDoc(workshopDocRef);
  
      console.log("Workshop ID:", workshopId);
  
      if (workshopDocSnapshot.exists()) {
        const { teachers, students } = workshopDocSnapshot.data();
        console.log("Workshop Data:", { workshopId, teachers, students });
        return { workshopId, teachers, students };
      } else {
        console.error("El documento del taller no existe para workshopId:", workshopId);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener los IDs de profesores y estudiantes:", error);
      return null;
    }
  };
  
  
  useEffect(() => {
    const loadMessages = async () => {
      try {
        let userId;
        let chatPartnerId;
        let workshopId;
  
        const workshopData = await getTeachersAndStudentsFromWorkshop(studentId || teacherId);
        console.log("Workshop Data:", workshopData);
  
        if (workshopData) {
          workshopId = workshopData.workshopId;
  
          console.log("Workshop ID:", workshopId);
  
          if (studentId) {
            userId = studentId;
            chatPartnerId = workshopData.teachers ? workshopData.teachers.id : null;
          } else if (teacherId) {
            userId = teacherId;
            chatPartnerId = workshopData.students ? workshopData.students.map((student) => student.id) : null;
          }
        }
  
        console.log("UserID:", userId);
        console.log("ChatPartnerID:", chatPartnerId);
  
        // Configura la consulta para obtener los mensajes
        const messagesCollectionRef = collection(db, "chats", `${studentId}-${teacherId}`);
        let q;
  
        // Construir la consulta dependiendo de si chatPartnerId es válido
        if (chatPartnerId) {
          q = query(
            messagesCollectionRef,
            orderBy("createdAt", "desc"),
            where("senderId", "in", [userId, ...chatPartnerId]),
            where("receiverId", "in", [userId, ...chatPartnerId]),
            limit(50)
          );
        } else {
          // En caso de chatPartnerId nulo, consulta solo por el usuario actual
          q = query(
            messagesCollectionRef,
            orderBy("createdAt", "desc"),
            where("senderId", "==", userId),
            limit(50)
          );
        }
  
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          const fetchedMessages = [];
          QuerySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
          });
          const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
          setMessages(sortedMessages);
        });
  
        return () => unsubscribe;
      } catch (error) {
        console.error("Error al cargar los mensajes", error.message);
      }
    };
  
    // Llama a la función para cargar los mensajes después de crear el documento del taller
    if (studentId && teacherId) {
      loadMessages();
    }
  }, [db, studentId, teacherId]);

  useEffect(() => {
    // Scroll hacia abajo cuando se cargan nuevos mensajes
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages])

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
      <SendMessage scroll={scroll} studentId={studentId} teacherId={teacherId} />
    </main>
  );
}

export default ChatBox;
