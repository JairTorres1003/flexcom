import React from "react";
import { IoAdd } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";
import { useModals } from "../../hooks/useModals";

import "./MenuChannel.css";

export default function MenuChannel() {
  const { modals } = useModals();

  return (
    <div className="MenuChannel">
      <h2 className="MenuChannel__title">Canales</h2>
      <div className="MenuChannel__button">
        <button className="MenuChannel__button__createChannel" id="button-createChannel" onClick={() => modals.openModal("modal-createChannel")}>
          <IoAdd className="MenuChannel__button__createChannel__icon" />
          <p>Crea un nuevo canal</p>
        </button>
      </div>
      <div className="MenuChannel__list">
        <ul className="MenuChannel__list-list">
          {/* ↓ Ejemplo Eliminar despues ↓ */}
          <li className="MenuChannel__list-channel">
            <RiHashtag className="MenuChannel__list-channel__icon" />
            <p>Canal-1</p>
          </li>
          <li className="MenuChannel__list-channel">
            <VscLock className="MenuChannel__list-channel__icon" />
            <p>Canal-2</p>
          </li>
          {/* ↑ Ejemplo Eliminar despues ↑ */}
        </ul>
      </div>
    </div>
  )
}
