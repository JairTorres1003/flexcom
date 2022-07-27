import React from "react";
import { useCreateChannel } from "../../hooks/useCreateChannel";
import { useModals } from "../../hooks/useModals";
import PanelUsers from "../PanelUsers/PanelUsers";

import "./ModalCreateChannel.css";

export default function ModalCreateChannel() {
  const { modals } = useModals();
  const { 
    isCreate, 
    setIsCreate, 
    createChannel, 
    KeyUpNameChannel, 
    changeVisibility, 
    activeFocusInvited, 
    addNewInvited,
    setInvitedList,
    invitedList,
    removeInvited,
    listUsers
  } = useCreateChannel();

  return (
    <div className="ModalCreateChannel" id="modal-createChannel">
      <div className="ModalCreateChannel__modal">
        <h2 className="ModalCreateChannel__modal__title">Crea un nuevo canal</h2>
        <div className="ModalCreateChannel__modal__content">
          <div className="ModalCreateChannel__modal__content__name">
            <label className="ModalCreateChannel__modal__content__name__label">Nombre del canal</label>
            <input type="text" id="name-channel" className="ModalCreateChannel__modal__content__name__input" placeholder="Ejemplo: informacion" onKeyUp={KeyUpNameChannel} autoComplete="off" />
          </div>
          <div className="ModalCreateChannel__modal__content__description">
            <label className="ModalCreateChannel__modal__content__description__label">Descripción del canal</label>
            <textarea id="description-channel" className="ModalCreateChannel__modal__content__description__textarea" placeholder="Ejemplo: Canal de informacion"></textarea>
          </div>
          <div className="ModalCreateChannel__modal__content__visibility">
            <label className="ModalCreateChannel__modal__content__visibility__label">Visibilidad</label>
            <div className="ModalCreateChannel__modal__content__visibility__input">
              <input type="checkbox" id="visibility-channel" onClick={changeVisibility} />
              <span className="button-checkbox"></span>
            </div>
          </div>
          <p className="ModalCreateChannel__modal__content__visibility__message" id="msgPublic-private">{isCreate.visibility}</p>
          <div className="ModalCreateChannel__modal__content__invite --public">
            <label className="ModalCreateChannel__modal__content__invite__label">Invitar usuarios</label>
            <div id="invite-channel" className="ModalCreateChannel__modal__content__invite__list" onClick={activeFocusInvited}>
              {invitedList ? invitedList.map((user, index) => <span 
                key={index}
                onClick={() => removeInvited(user)}
              >{user.name}</span> ) : null}
              <input type="text" id="search-invited" placeholder="Ejemplo: @juan" autoComplete="off" onKeyUp={addNewInvited}/>
            </div>
            <PanelUsers 
              setInvitedList={setInvitedList}
              invitedList={invitedList}
              listUsers={listUsers}
            />
          </div>
          <div className="ModalCreateChannel__modal__content__space"></div>
          <div className="ModalCreateChannel__modal__content__buttons">
            <button className="ModalCreateChannel__modal__content__buttons__button" onClick={createChannel}>{
              isCreate.loading ? "Creando..." : "Crear canal"
            }</button>
            <button className="ModalCreateChannel__modal__content__buttons__button" id="cancelChannel-btn" onClick={() => {
              modals.closeModal("modal-createChannel");
              setIsCreate({ visibility: "El canal es visible para todos, cualquier usuario puede unirse." });
              setInvitedList([]);
            }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}


window.addEventListener('click', function (e) {
  const nameChannel = document.getElementById('name-channel');
  const PanelUsers = document.getElementsByClassName('PanelUsers')[0];
  const inviteChannel = document.getElementById('invite-channel');

  if (e.target !== nameChannel && !!nameChannel) {
    let name = nameChannel.value;
    let nameArray = name.split('-');
    nameArray = nameArray.filter(function (e) {
      return e.length > 0;
    });
    nameChannel.value = nameArray.join('-');
    if (e.target !== inviteChannel) {
      PanelUsers.classList.remove('--searchActive');
    }
  }
});