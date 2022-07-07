import React, { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

import "./MenuUsers.css";

export default function MenuUsers() {
  const [isOpenOnline, setIsOpenOnline] = useState({
    icon: <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />
  }
  );
  const [isOpenOffline, setIsOpenOffline] = useState({
    icon: <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />
  });

  const openOnline = () => {
    deployUsers(0);
  }
  const openOffline = () => {
    deployUsers(1);
  }

  const deployUsers = (btn) => {
    let userListOnOff = document.getElementsByClassName('--userListOnOff');
    let MenuUsersContent = document.getElementsByClassName('MenuUsers__users')[0];
    let heightUsers = (userListOnOff[btn].childElementCount * 21) + ((userListOnOff[btn].childElementCount - 1) * 3);
    let iconChevron1;
    let iconChevron2;

    MenuUsersContent.scrollTop = 0;

    if (userListOnOff[btn].offsetHeight === 0 && heightUsers > 0) {
      userListOnOff[btn].style.height = heightUsers + 'px';
      userListOnOff[1 - btn].removeAttribute('style');
      if (btn === 0) {
        iconChevron1 = <HiOutlineChevronDown className="MenuUsers__users__onOff__btn__icon" />;
        iconChevron2 = <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />;
      } else {
        iconChevron1 = <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />;
        iconChevron2 = <HiOutlineChevronDown className="MenuUsers__users__onOff__btn__icon" />;
      }
    } else {
      userListOnOff[btn].removeAttribute('style');
      iconChevron1 = <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />;
      iconChevron2 = <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />;
    }

    setIsOpenOnline(prviusState => {
      return {
        ...prviusState, icon: iconChevron1
      };
    });
    setIsOpenOffline(prviusState => {
      return {
        ...prviusState, icon: iconChevron2
      };
    });
  }

  return (
    <div className="MenuUsers">
      <h2 className="MenuUsers__title">Usuarios</h2>
      <div className="MenuUsers__users">
        <div className="MenuUsers__users__online">
          <button className="MenuUsers__users__online__btn" id="button-online" onClick={openOnline}>
            {isOpenOnline.icon}
            <p>Usuarios en linea</p>
          </button>
          <ul className="MenuUsers__users__online-list --userListOnOff">
            {/* ↓ Ejemplo Eliminar despues ↓ */}
            <li className="MenuUsers__users__online-user">
              <BsCircleFill className="MenuUsers__users__online-user__icon" />
              <p>Nombre usuario 1</p>
            </li>
            <li className="MenuUsers__users__online-user">
              <BsCircleFill className="MenuUsers__users__online-user__icon" />
              <p>Nombre usuario 2</p>
            </li>
            {/* ↑ Ejemplo Eliminar despues ↑ */}
          </ul>
        </div>
        <div className="MenuUsers__users__offline">
          <button className="MenuUsers__users__offline__btn" id="button-offline" onClick={openOffline}>
            {isOpenOffline.icon}
            <p>Usuarios desconectados</p>
          </button>
          <ul className="MenuUsers__users__offline-list --userListOnOff">
            {/* ↓ Ejemplo Eliminar despues ↓ */}
            <li className="MenuUsers__users__offline-user">
              <BsCircleFill className="MenuUsers__users__offline-user__icon" />
              <p>Nombre usuario 3</p>
            </li>
            <li className="MenuUsers__users__offline-user">
              <BsCircleFill className="MenuUsers__users__offline-user__icon" />
              <p>Nombre usuario 4</p>
            </li>
            {/* ↑ Ejemplo Eliminar despues ↑ */}
          </ul>
        </div>
      </div>
    </div>
  )
}