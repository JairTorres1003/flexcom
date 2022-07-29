import React from "react";
import Select from "react-select";
import { useCreateChannel } from "../../hooks/useCreateChannel";
import { useModals } from "../../hooks/useModals";
import Switch from '@mui/material/Switch';


import "./ModalCreateChannel.css";

export default function ModalCreateChannel({ usersList }) {
  const { modals } = useModals();
  const {
    isCreate,
    setIsCreate,
    createChannel,
    KeyUpNameChannel,
    changeVisibility,
    selectedOptions,
    setSelectedOptions
  } = useCreateChannel();

  return (
    <div className="ModalCreateChannel" id="modal-createChannel">
      <div className="ModalCreateChannel__modal animate__animated animate__zoomIn">
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
            <Switch
              checked={isCreate.visibility}
              onChange={changeVisibility}
              name="switch-visibility"
              inputProps={{ 'aria-label': 'switch visibility' }}
              size="small"
            />
          </div>
          <p className="ModalCreateChannel__modal__content__visibility__message" id="msgPublic-private">{
            isCreate.visibility 
            ? "El canal será privado, solo los usuarios que invites podrán unirse."
            : "El canal es visible para todos, cualquier usuario puede unirse."
          }</p>
          <div className={`ModalCreateChannel__modal__content__invite ${isCreate.visibility ? '' : '--public'}`}>
            <label className="ModalCreateChannel__modal__content__invite__label">Invitar usuarios</label>
            <Select
              id="search-invited"
              placeholder="Invita a un usuario"
              value={selectedOptions}
              options={
                usersList.map(user => {
                  return {
                    value: user.uid,
                    label: user.name
                  }
                })
              }
              name="select-invited"
              isSearchable={true}
              isClearable={true}
              isMulti
              onChange={(item) => setSelectedOptions(item)}
            />
          </div>
          <div className="ModalCreateChannel__modal__content__space"></div>
          <div className="ModalCreateChannel__modal__content__buttons">
            <button className="ModalCreateChannel__modal__content__buttons__button" onClick={createChannel}>{
              isCreate.loading ? "Creando..." : "Crear canal"
            }</button>
            <button className="ModalCreateChannel__modal__content__buttons__button" id="cancelChannel-btn" onClick={() => {
              modals.closeModal("modal-createChannel");
              setIsCreate({ visibility: false });
            }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}


window.addEventListener('click', function (e) {
  const nameChannel = document.getElementById('name-channel');

  if (e.target !== nameChannel && !!nameChannel) {
    let name = nameChannel.value;
    let nameArray = name.split('-');
    nameArray = nameArray.filter(function (e) {
      return e.length > 0;
    });
    nameChannel.value = nameArray.join('-');
  }
});