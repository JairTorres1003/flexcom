import React, { useContext } from "react";
import { IoNotificationsOutline, IoChatbubblesOutline, IoPersonOutline, IoWarning } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { AuthContext } from "../../context/authProvider";

import "./Menu.css";
import MenuChannel from "../MenuChannel/MenuChannel";
import MenuMessages from "../MenuMessages/MenuMessages";
import MenuNotification from "../MenuNotification/MenuNotification";
import MenuUsers from "../MenuUsers/MenuUsers";
import { useMenu } from "../../hooks/useMenu";

export default function Menu({ usersList, channelsList, setCurrentChat, updateLastConversation }) {
  const [menu, openMenu, closeMenu, openAccount, signOutUser] = useMenu();
  const { user } = useContext(AuthContext);

  return (
    <aside className="Menu">
      <div className="Menu__Buttons">
        <div className="Menu__Buttons__options">
          <ul className="Menu__Buttons__options__list">
            <li className="Menu__Buttons__options__list__item">
              <button className="Menu__Buttons__options__list__item__button" id="button-Notification" onClick={() => openMenu(0)}>
                <IoNotificationsOutline className="menu_iconBtn" />
                <span className="span_button_title">Notificaciones</span>
              </button>
            </li>
            <li className="Menu__Buttons__options__list__item">
              <button className="Menu__Buttons__options__list__item__button" id="button-Channel" onClick={() => openMenu(1)}>
                <RiHashtag className="menu_iconBtn" />
                <span className="span_button_title">Canales</span>
              </button>
            </li>
            <li className="Menu__Buttons__options__list__item">
              <button className="Menu__Buttons__options__list__item__button" id="button-Message" onClick={() => openMenu(2)}>
                <IoChatbubblesOutline className="menu_iconBtn" />
                <span className="span_button_title">Mensajes</span>
              </button>
            </li>
            <li className="Menu__Buttons__options__list__item">
              <button className="Menu__Buttons__options__list__item__button" id="button-User" onClick={() => openMenu(3)}>
                <IoPersonOutline className="menu_iconBtn" />
                <span className="span_button_title">Usuarios</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="Menu__Buttons__account">
          <button className="Menu__Buttons__account__button" id="button-Account" onClick={openAccount}>
            <VscAccount className="menu_iconBtn" />
            {
              user ? (
                user.emailVerified ? null : <IoWarning className="icon_Warning" id="account-warning" />
              ) : null
            }
            <span className="span_button_title">Cuenta</span>
          </button>
          <div className="Menu__Buttons__account__panel _view" id="account-panel">
            <button className="Menu__Buttons__account__panel__button" id='name-user'>
              {user ? user.displayName : ''}
              {
                user ? (
                  user.emailVerified ? null : <IoWarning className="icon_Warning" />
                ) : null
              }
            </button>
            <button className="Menu__Buttons__account__panel__button" onClick={signOutUser}>Cerrar sesión</button>
          </div>
        </div>
      </div>
      <div className="Menu__Content" id="menu-content">
        <button className="Menu__Content__close" onClick={closeMenu}>
          <IoIosClose className="menu_iconBtn" />
        </button>
        <div className="Menu__Content__panels">
          <MenuNotification />
          <MenuChannel
            channelsList={channelsList}
            setCurrentChat={setCurrentChat}
            updateLastConversation={updateLastConversation}
          />
          <MenuMessages
            setCurrentChat={setCurrentChat}
            updateLastConversation={updateLastConversation}
          />
          <MenuUsers
            usersList={usersList}
            setCurrentChat={setCurrentChat}
            updateLastConversation={updateLastConversation}
          />
        </div>
      </div>
    </aside>
  );
}

window.addEventListener("click", function (e) {
  const account = document.getElementById("account-panel");
  const accountWarning = document.getElementById("account-warning");
  const buttonAccount = document.getElementById("button-Account");
  if (e.target !== account && e.target !== buttonAccount && account) {
    account.classList.add("_view");
    if (accountWarning) { accountWarning.classList.remove("_view"); }
  }
});