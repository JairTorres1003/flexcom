import React from 'react'
import { BsCircleFill } from "react-icons/bs";

import "./User.css";

export const User = ({ user, setCurrentChat }) => {
  return (
    <li className="MenuUsers__users--user" onClick={() => setCurrentChat(user)}>
      <BsCircleFill className={`MenuUsers__users--user__icon ${user.isOnline ? '--online' : '--offline'}`} />
      <p>{user.name}</p>
    </li>
  )
}
