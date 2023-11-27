/* eslint-disable react/prop-types */
import { auth } from "../../../server/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Message.css"

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : "left"}`}>
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {message.text && <p className="user-message">{message.text}</p>}
        {message.image && <img src={message.image} alt="uploaded" />}
      </div>
    </div>
  );
};

export default Message;
