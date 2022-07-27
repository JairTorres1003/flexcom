import React from 'react';

import "./PanelUsers.css";

export default function PanelUsers({ setInvitedList, invitedList, listUsers }) {
  const loadAddUser = (user) => {
    const searchInvited = document.getElementById('search-invited');
    searchInvited.value = "";
    searchInvited.focus();
    if (invitedList.length === 0) {
      setInvitedList([user]);
    } else {
      if (!invitedList.includes(user)) {
        setInvitedList([...invitedList, user]);
      }
    }
  }

  return (
    <div className="PanelUsers">
      <h3 className="PanelUsers__title">Usuarios</h3>
      <ul className="PanelUsers__list">
        {listUsers ? listUsers.map(user => (
            <li key={user.uid} className="PanelUsers__list__item" onClick={() => loadAddUser(user)}>
              {user.name}
            </li>
        )) : <li className="PanelUsers__list__item --noUsers">No hay usuarios</li>}
        <li id="no-users">No hay usuarios</li>
      </ul>
    </div>
  )
}