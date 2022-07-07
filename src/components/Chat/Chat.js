import React from "react";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import NavBar from "../NavBar/NavBar";
import TextEdit from "../TextEdit/TextEdit";


import "./Chat.css";

export default function Chat() {
  return (
    <div className="Chat">
      <NavBar />
      <div className="Chat__messages">
        <div className="Chat_topHeight"></div>
        {/* <MessagesContainer /> */}
      </div>
      <TextEdit />
    </div>
  );
}
