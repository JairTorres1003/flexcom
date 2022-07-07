import React from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";

import "./NavBar.css";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="NavBar__title">
        <label id="nameOrChannel">Nombre/Canal</label>
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
        <button className="NavBar__usersChannel__button">
          <IoPeopleOutline className="Icon_usersChannel" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;