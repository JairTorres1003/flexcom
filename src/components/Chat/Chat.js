import { useMessages } from "../../hooks/useMessages";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import NavBar from "../NavBar/NavBar";
import TextEdit from "../TextEdit/TextEdit";


import "./Chat.css";

export default function Chat({ currentChat }) {
  const { messages } = useMessages({ currentChat });
  return (
    <div className="Chat">
      <NavBar currentChat={currentChat} />
      <div className="Chat__messages">
        <div className="Chat_topHeight"></div>
        {
          messages ? messages.map((msg, index) => {
            return <MessagesContainer key={index} msg={msg} />
          }) : null
        }
      </div>
      <TextEdit currentChat={currentChat} />
    </div>
  );
}