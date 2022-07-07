import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";

import "./MenuMessages.css";

export default function MenuMessages() {
  return (
    <div className="MenuMessages">
      <h2 className="MenuMessages__title">Mensajes</h2>
      <div className="MenuMessages__buttons">
        <button className="MenuMessages__buttons__btn" id="button-sendMessage">
          <IoAdd className="MenuMessages__buttons__btn__icon" />
          <p>Envia un nuevo mensaje</p>
        </button>
        <button className="MenuMessages__buttons__btn" id="button-draftMessage">
          <BsCircleFill className="MenuMessages__list-message__icon" />
          <p>Nombre Completo <span>(tú)</span></p>
        </button>
      </div>
      <div className="MenuMessages__list">
        <ul className="MenuMessages__list-list">
          {/* ↓ Ejemplo Eliminar despues ↓ */}
          <li className="MenuMessages__list-message">
            <BsCircleFill className="MenuMessages__list-message__icon" />
            <p>Nombre usuario 1</p>
          </li>
          <li className="MenuMessages__list-message">
            <BsCircleFill className="MenuMessages__list-message__icon" />
            <p>Nombre usuario 2</p>
          </li>
          {/* ↑ Ejemplo Eliminar despues ↑ */}
        </ul>
      </div>
    </div>
  )
}

window.addEventListener('click', function (e) {
  if (e.target.id === 'button-sendMessage') {
    let buttonUser = document.getElementById('button-User');
    buttonUser.click();
  }
});