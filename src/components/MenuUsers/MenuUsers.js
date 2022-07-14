import React, { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronRight } from "react-icons/hi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

import "./MenuUsers.css";
import { User } from "../User/User";

export default function MenuUsers({ setCurrentChat }) {
  const { users, isOpenUsers, deployUsers } = useUsers();

  return (
    <div className="MenuUsers">
      <h2 className="MenuUsers__title">Usuarios</h2>
      <div className="MenuUsers__users">
        <div className="MenuUsers__users__online">
          <button className="MenuUsers__users__online__btn" id="button-online" onClick={() => deployUsers(0)}>
            {isOpenUsers.iconOnline}
            <p>Usuarios en linea</p>
          </button>
          <ul className="MenuUsers__users__online-list --userListOnOff">
            {
              users.filter(user => user.isOnline).map(user => <User 
                key={user.uid} 
                user={user} 
                setCurrentChat={setCurrentChat}
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
              users.filter(user => !user.isOnline).map(user => <User 
                key={user.uid} 
                user={user} 
                setCurrentChat={setCurrentChat}
              />)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

const useUsers = () => {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]));
    const unsub = onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });
      setUsers(users);
    });
  }, []);

  return { users, isOpenUsers, deployUsers };
}