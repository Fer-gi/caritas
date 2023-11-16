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
  const { studentId, teacherId } = useParams();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        let userId;
        let chatPartnerId;

        if (studentId) {
          // Si es un student, obtén el ID del teacher
          const teacher = await getTeachersByStudent(studentId);
          userId = studentId;
          chatPartnerId = teacherId;
        } else if (teacherId) {
          // Si es un teacher, obtén los IDs de los estudiantes
          const students = await getStudentsByTeacher(teacherId);
          userId = teacherId;
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
  }, [studentId, teacherId]);

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
