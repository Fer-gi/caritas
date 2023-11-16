import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import { getTeachersByStudent, getStudentsByTeacher } from "../../firebase/firebaseRead";
import "./Chat.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { alumnoId, orientadorId } = useParams();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        let userId;
        let chatPartnerId;

        if (alumnoId) {
          // Si es un alumno, obtén el ID del orientador
          const orientador = await getTeachersByStudent(alumnoId);
          userId = alumnoId;
          chatPartnerId = orientador.id;
        } else if (orientadorId) {
          // Si es un orientador, obtén los IDs de los estudiantes
          const students = await getStudentsByTeacher(orientadorId);
          userId = orientadorId;
          chatPartnerId = students.map((student) => student.id);
        }

        // Configura la consulta para obtener los mensajes
        const q = query(
          collection(db, "messages"),
          orderBy("createdAt", "desc"),
          where("senderId", "in", [userId, chatPartnerId]),
          where("receiverId", "in", [userId, chatPartnerId]),
          limit(50)
        );

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
        console.error("Error al cargar los mensajes", error);
      }
    };

    loadMessages();
  }, [alumnoId, orientadorId]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
