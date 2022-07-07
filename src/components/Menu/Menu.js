import React, { useState } from "react";
import { IoNotificationsOutline, IoChatbubblesOutline, IoPersonOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";

import "./Menu.css";
import MenuChannel from "../MenuChannel/MenuChannel";
import MenuMessages from "../MenuMessages/MenuMessages";
import MenuNotification from "../MenuNotification/MenuNotification";
import MenuUsers from "../MenuUsers/MenuUsers";

export default function Menu() {
  const [menu, openMenu, closeMenu, openAccount] = useMenu();

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
            <span className="span_button_title">Cuenta</span>
          </button>
          <div className="Menu__Buttons__account__panel _view" id="account-panel">
            <button className="Menu__Buttons__account__panel__button" id='name-user'>Nombre usuario</button>
            <button className="Menu__Buttons__account__panel__button">Cerrar sesión</button>
          </div>
        </div>
      </div>
      <div className="Menu__Content" id="menu-content">
        <button className="Menu__Content__close" onClick={closeMenu}>
          <IoIosClose className="menu_iconBtn" />
        </button>
        {menu}
      </div>
    </aside>
  );
}

const useMenu = () => {
  const [menu, setMenu] = useState(null);

  const openMenu = (btn) => {
    let menuCotent = document.getElementById("menu-content");
    let buttons = document.getElementsByClassName("Menu__Buttons__options__list__item__button");
    let typeMenu = '';
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("_active");
    }
    buttons[btn].classList.add("_active");
    menuCotent.classList.add("_MenuView");

    if (btn === 0) {
      typeMenu = <MenuNotification />;
    } else if (btn === 1) {
      typeMenu = <MenuChannel />;
    } else if (btn === 2) {
      typeMenu = <MenuMessages />;
    } else if (btn === 3) {
      typeMenu = <MenuUsers />;
    }

    setMenu(typeMenu);
  }

  const closeMenu = () => {
    let menuCotent = document.getElementById("menu-content");
    let buttons = document.getElementsByClassName("Menu__Buttons__options__list__item__button");
    menuCotent.classList.remove("_MenuView");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("_active");
    }
    setMenu('');
  }

  const openAccount = () => {
    let account = document.getElementById("account-panel");
    if (account.classList.contains("_view")) {
      account.classList.remove("_view");
    } else {
      account.classList.add("_view");
    }
  }

  return [
    menu,
    openMenu,
    closeMenu,
    openAccount
  ];
}

// evento para cerrar el account si se hace click afuera del mismo
window.addEventListener("click", function (e) {
  const account = document.getElementById("account-panel");
  const buttonAccount = document.getElementById("button-Account");
  if (e.target !== account && e.target !== buttonAccount) {
    account.classList.add("_view");
  }
});