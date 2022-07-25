import React, { useContext } from "react";
import { BsCircleFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { AuthContext } from "../../context/authProvider";
import { useUserMessages } from "../../hooks/useUserMessages";

import "./MenuMessages.css";

export default function MenuMessages({ setCurrentChat, updateLastConversation }) {
  const { user } = useContext(AuthContext);
  const userObj = {
    name: user.displayName,
    uid: user.uid
  }
  const { usersMessages } = useUserMessages({ user });

  return (
    <div className="MenuMessages _panels">
      <h2 className="MenuMessages__title">Mensajes</h2>
      <div className="MenuMessages__buttons">
        <button className="MenuMessages__buttons__btn" id="button-sendMessage">
          <IoAdd className="MenuMessages__buttons__btn__icon" />
          <p>Envia un nuevo mensaje</p>
        </button>
        <button className="MenuMessages__buttons__btn" id="button-draftMessage" onClick={() => {
          setCurrentChat(userObj);
          updateLastConversation(userObj.uid);
        }}>
          <BsCircleFill className="MenuMessages__list-message__icon" />
          <p>{user ? user.displayName : null} <span>(tú)</span></p>
        </button>
      </div>
      <div className="MenuMessages__list">
        <ul className="MenuMessages__list-list">
          {
            usersMessages ? (
              usersMessages.map((userMsg, index) => {
                return (
                  <li className="MenuMessages__list-message" key={index} onClick={() => {
                    setCurrentChat(userObj);
                    updateLastConversation(userObj.uid);
                  }}>
                    <BsCircleFill className="MenuMessages__list-message__icon" />
                    <p>{userMsg.name}</p>
                  </li>
                )
              })
            ) : null
          }
        </ul>
      </div>
    </div>
  )
}

window.addEventListener('click', function (e) {
  if (e.target.id === 'button-sendMessage') {
    let buttonUser = document.getElementById('button-User');
    buttonUser.click();
  }
});