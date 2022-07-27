import React from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";

import "./NavBar.css";

function NavBar({ currentChat }) {
  return (
    <div className="NavBar">
      <div className="NavBar__title">
        {
          currentChat ? (
            currentChat.hasOwnProperty("visibility") ? (
              currentChat.visibility === "public" ? (
                <RiHashtag className="NavBar__title__icon" />
              ) : (
                <VscLock className="NavBar__title__icon" />
              )
            ) : null
          ) : null
        }
        <label id="nameOrChannel">{
          currentChat ? currentChat.name : ""
        }</label>
      </div>
      <div className="NavBar__finder">
        <input type="text" placeholder="Busca" className="NavBar__finder__input" />
        <button className="NavBar__finder__button">
          <HiOutlineChevronDown className="Icon_finderButton" />
        </button>
        <button className="NavBar__finder__button">
          <HiOutlineChevronUp className="Icon_finderButton" />
        </button>
      </div>
      <div className="NavBar__usersChannel">
        {
          currentChat ? (
            currentChat.hasOwnProperty("visibility") ? (
              <button className="NavBar__usersChannel__button">
                <IoPeopleOutline className="Icon_usersChannel" />
                {currentChat.members.length}
              </button>
            ) : null
          ) : null
        }
      </div>
    </div>
  );
}

export default NavBar;