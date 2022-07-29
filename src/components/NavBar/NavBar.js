import React, { useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";

import "./NavBar.css";

function NavBar({ currentChat }) {
  const { isNavBar, shearchMessages } = useNavBar();

  return (
    <div className="NavBar">
      <div className="NavBar__title">
        {
          currentChat ? (
            currentChat.hasOwnProperty("visibility") ? (
              currentChat.visibility === "public" ? (
                <RiHashtag className="NavBar__title__icon" />
              ) : (
                <VscLock className="NavBar__title__icon" />
              )
            ) : null
          ) : null
        }
        <label id="nameOrChannel">{
          currentChat ? currentChat.name : ""
        }</label>
      </div>
      <div className="NavBar__finder">
        <input type="text" placeholder="Buscar" className="NavBar__finder__input" onKeyUp={shearchMessages} />
      </div>
      <div className="NavBar__usersChannel">
        {
          currentChat ? (
            currentChat.hasOwnProperty("visibility") ? (
              <button className="NavBar__usersChannel__button">
                <IoPeopleOutline className="Icon_usersChannel" />
                {currentChat.members.length}
              </button>
            ) : null
          ) : null
        }
      </div>
    </div>
  );
}

export default NavBar;

const useNavBar = () => {
  const [isNavBar, setIsNavBar] = useState(false);

  const shearchMessages = (e) => {
    const NavBarFinderInput = document.getElementsByClassName("NavBar__finder__input")[0];
    const ChatReply = document.getElementsByClassName("Chat__reply")[0];
    let Container = document.querySelectorAll(".MessagesContainer");
    const MessagesReply = document.querySelectorAll(".MessagesReply");

    if (ChatReply.classList.contains("--replyActive")) {
      Container = MessagesReply;
    }

    if (NavBarFinderInput.value.length > 0) {
      Container.forEach((element) => {
        if (element.innerText.toLowerCase().replace(/\s/g, " ").includes(NavBarFinderInput.value.toLowerCase())) {
          element.classList.remove("--hidden");
        } else {
          element.classList.add("--hidden");
        }
      });
    } else {
      Container.forEach((element) => {
        element.classList.remove("--hidden");
      });
    }
  }

  return {
    isNavBar,
    shearchMessages
  }
}