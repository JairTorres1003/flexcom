import React, { useState } from "react";
import { useMessages } from "../../hooks/useMessages";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import MessagesReply from "../MessagesReply/MessagesReply";
import NavBar from "../NavBar/NavBar";
import TextEdit from "../TextEdit/TextEdit";
import { AiOutlineArrowRight } from "react-icons/ai";

import "./Chat.css";

export default function Chat({ currentChat }) {
  const { messages } = useMessages({ currentChat });
  const [msgReply, setMsgReply] = useState(null);

  const closeReply = () => {
    setMsgReply(null);
    const ChatReply = document.getElementsByClassName("Chat__reply")[0];
    ChatReply.classList.remove("--replyActive");
  }

  return (
    <div className="Chat">
      <NavBar currentChat={currentChat} />
      <div className="Chat__container">
        <div className="Chat__messages">
          <div className="Chat_topHeight"></div>
          {
            messages ? messages.map((msg, index) => {
              return <MessagesContainer
                key={index}
                msg={msg}
                setMsgReply={setMsgReply}
              />
            }) : null
          }
        </div>
        <div className="Chat__reply">
          <button className="Chat__reply__button" onClick={closeReply}>
            <AiOutlineArrowRight className="Chat__reply__button__icon" />
          </button>
          <div className="container__replys">
            <div className="container__replys__reply">
              {
                msgReply ? <MessagesReply msg={msgReply} /> : null
              }
            </div>
            <div className="container__replys__messages">
              <div className="Chat_topHeight"></div>
            </div>
          </div>
        </div>
      </div>
      <TextEdit currentChat={currentChat} />
    </div>
  );
}