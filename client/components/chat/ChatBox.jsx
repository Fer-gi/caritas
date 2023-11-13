import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import "./Chat.css";
import UserList from "./UserList";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
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
  }, []);

  return (
    <div className="chat-container">
      <div className="user-list-container">
        <UserList onUserClick={handleUserClick} />
      </div>
      <main className="chat-box">
        {selectedUser ? (
          <>
            <div className="messages-wrapper">
              {messages?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
          </>
        ) : (
          <p>Select a user to start chatting.</p>
        )}
      </main>
    </div>
  );
};

export default ChatBox;
