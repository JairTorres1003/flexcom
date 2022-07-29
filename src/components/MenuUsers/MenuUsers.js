import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";

import "./MenuUsers.css";
import { User } from "../User/User";

export default function MenuUsers({ usersList, setCurrentChat, updateLastConversation }) {
  const { isOpenUsers, deployUsers } = useUsers();

  return (
    <div className="MenuUsers _panels">
      <h2 className="MenuUsers__title">Usuarios</h2>
      <div className="MenuUsers__users">
        <div className="MenuUsers__users__online">
          <button className="MenuUsers__users__online__btn" id="button-online" onClick={() => deployUsers(0)}>
            {isOpenUsers.iconOnline}
            <p>Usuarios en linea</p>
          </button>
          <ul className="MenuUsers__users__online-list --userListOnOff">
            {
              usersList.filter(user => user.isOnline).map(user => <User 
                key={user.uid} 
                user={user} 
                setCurrentChat={setCurrentChat}
                updateLastConversation={updateLastConversation}
              />)
            }
          </ul>
        </div>
        <div className="MenuUsers__users__offline">
          <button className="MenuUsers__users__offline__btn" id="button-offline" onClick={() => deployUsers(1)}>
            {isOpenUsers.iconOffline}
            <p>Usuarios desconectados</p>
          </button>
          <ul className="MenuUsers__users__offline-list --userListOnOff">
            {
              usersList.filter(user => !user.isOnline).map(user => <User 
                key={user.uid} 
                user={user} 
                setCurrentChat={setCurrentChat}
                updateLastConversation={updateLastConversation}
              />)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

const useUsers = () => {
  const [isOpenUsers, setIsOpenUsers] = useState({
    iconOnline: <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />, 
    iconOffline: <HiOutlineChevronRight className="MenuUsers__users__onOff__btn__icon" />
  });

  const deployUsers = (btn) => {
    let userListOnOff = document.getElementsByClassName('--userListOnOff');
    let MenuUsersContent = document.getElementsByClassName('MenuUsers__users')[0];
    let heightUsers = (userListOnOff[btn].childElementCount * 21) + ((userListOnOff[btn].childElementCount - 1) * 3);
    let iconChevron1;
    let iconChevron2;

    MenuUsersContent.scrollTop = 0;
    userListOnOff[1 - btn].removeAttribute('style');

    if (userListOnOff[btn].offsetHeight === 0 && heightUsers > 0) {
      userListOnOff[btn].style.height = heightUsers + 'px';
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

    setIsOpenUsers(prviusState => {
      return {
        ...prviusState,
        iconOnline: iconChevron1,
        iconOffline: iconChevron2
      };
    });
  }

  return { isOpenUsers, deployUsers };
}