import React from 'react'
import { BsCircleFill } from "react-icons/bs";

import "./User.css";

export const User = ({ user, selectUser }) => {
  return (
    <li className="MenuUsers__users--user" onClick={() => selectUser(user)}>
      <BsCircleFill className={`MenuUsers__users--user__icon ${user.isOnline ? '--online' : '--offline'}`} />
      <p>{user.name}</p>
    </li>
  )
}
