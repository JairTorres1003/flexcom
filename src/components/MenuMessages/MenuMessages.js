import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { AuthContext } from "../../context/authProvider";
import { db } from "../../firebase/firebaseConfig";

import "./MenuMessages.css";

export default function MenuMessages({ setCurrentChat }) {
  const { user } = useContext(AuthContext);
  const userObj = {
    name: user.displayName,
    uid: user.uid
  }

  const [usersMessages, setUsersMessages] = useState([]);


  const getUsersMessages = async () => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef);
    const unsub = onSnapshot(q, querySnapshot => {
      let usersMsg = [];
      querySnapshot.forEach(doc => {
        const userId = doc.data().id.replace(user.uid, "").replace("+", "");
        const userRef = collection(db, "users");
        const userQ = query(userRef, where("uid", "==", userId));
        const userUnsub = onSnapshot(userQ, userQuerySnapshot => {
          userQuerySnapshot.forEach(userDoc => {
            usersMsg.push(userDoc.data());
          });
        });
      });
      setUsersMessages(usersMsg);
      console.log(usersMessages);
    });
  }

  useEffect(() => {
    getUsersMessages();
  }, []);


  return (
    <div className="MenuMessages">
      <h2 className="MenuMessages__title">Mensajes</h2>
      <div className="MenuMessages__buttons">
        <button className="MenuMessages__buttons__btn" id="button-sendMessage">
          <IoAdd className="MenuMessages__buttons__btn__icon" />
          <p>Envia un nuevo mensaje</p>
        </button>
        <button className="MenuMessages__buttons__btn" id="button-draftMessage" onClick={() => setCurrentChat(userObj)}>
          <BsCircleFill className="MenuMessages__list-message__icon" />
          <p>{user ? user.displayName : null} <span>(tú)</span></p>
        </button>
      </div>
      <div className="MenuMessages__list">
        <ul className="MenuMessages__list-list">
          {
            usersMessages.map((userMsg, index) => {
              return (
                <li className="MenuMessages__list-list__item" key={index} onClick={() => setCurrentChat(userMsg)}>
                  <BsCircleFill className="MenuMessages__list-message__icon" />
                  <p>{userMsg.name}</p>
                </li>
              )
            })
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