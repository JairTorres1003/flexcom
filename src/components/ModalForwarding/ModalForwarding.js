import React, { useState } from "react";
import Select from "react-select";
import { useModals } from "../../hooks/useModals";
import { useForwarding } from "../../hooks/useForwarding";
import Moment from "react-moment";
import { HiDownload } from "react-icons/hi";
import Switch from '@mui/material/Switch';

import "animate.css";
import "./ModalForwarding.css";

export default function ModalForwarding({ usersList, channelsList }) {
  const { modals } = useModals();
  console.log(usersList, channelsList);
  const { 
    forwardMessage, 
    setForwardMessage, 
    optionsRecipients, 
    handleChangeRecipients 
  } = useForwarding();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="ModalForwarding" id="modal-forwarding">
      <div className="ModalForwarding__modal animate__animated animate__zoomIn">
        <h2 className="ModalForwarding__modal__title">Reenviar mensaje</h2>
        <div className="ModalForwarding__modal__content">
          <div className="ModalForwarding__modal__content__message">
            <label className="ModalForwarding__modal__content__message__label">Mensaje</label>
            <div className="ModalForwarding__modal__content__message__data">
              {
                forwardMessage ? <div className="ModalForwarding__modal__content__message__data__message">
                  <div className="MessagesContainer__header">
                    <h4 className="MessagesContainer__header__name">{forwardMessage.nameFrom}</h4>
                    <small className="MessagesContainer__header__time">
                      <Moment fromNow format="DD/MM/YYYY HH:mm">{forwardMessage.createdAt.toDate()}</Moment>
                    </small>
                  </div>
                  <div className="MessagesContainer__body">
                    <div className="MessagesContainer__body__text" dangerouslySetInnerHTML={{ __html: forwardMessage.message }}></div>
                    <div className="MessagesContainer__body__attachments">
                      <div className="container__attachments">
                        <div className="MessagesContainer__body__attachments__image">
                          <div className="MessagesContainer__body__attachments__image__container">
                            {
                              forwardMessage.media ? forwardMessage.media.map((media, index) => {
                                let nameImg = media.split('-NM%3D')[1].split('?alt')[0];
                                return (
                                  <img key={index} src={media} alt="media" title={nameImg} />
                                )
                              }) : null
                            }
                          </div>
                        </div>
                      </div>
                      <div className="container__attachments">
                        <div className="MessagesContainer__body__attachments__file">
                          <div className="MessagesContainer__body__attachments__file__container">
                            {
                              forwardMessage.files ? forwardMessage.files.map((file, index) => {
                                let nameFile = file.split('-NM%3D')[1].split('?alt')[0];
                                let extension = nameFile.substring(nameFile.length - 5, nameFile.length).split(".")[1]
                                return (
                                  <button className="FilesContainerPreview__chat" key={index} title={nameFile}>
                                    <div className="FilesContainerPreview__chat__icon">
                                      <HiDownload />
                                    </div>
                                    <label className="FilesContainerPreview__chat__name">
                                      {
                                        nameFile.length > 10 ? nameFile.substring(0, 10) + "..." + extension : nameFile
                                      }
                                    </label>
                                  </button>
                                )
                              }) : null
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : null
              }
            </div>
          </div>
          <div className="ModalForwarding__modal__content__recipients">
            <label className="ModalForwarding__modal__content__recipients__label">Destinatarios</label>
            <div className="ModalForwarding__modal__content__recipients__select">
              <Select 
                className="select__recipients --one"
                options={[
                  { label: "Canal", value: "channel" },
                  { label: "Usuario", value: "user" }
                ]}
                defaultValue={"user"}
                isClearable={false}
                onChange={handleChangeRecipients}
              />  
              <Select
                className="select__recipients --two"
                placeholder={optionsRecipients.title}
                options={optionsRecipients.options}
                name={optionsRecipients.title}
                isSearchable={true}
                isClearable={true}
              />
            </div>
          </div>
          <div className="ModalForwarding__modal__content__program">
            <div className="ModalForwarding__modal__content__program__label">
              <label>Programar</label>
              <Switch
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                name="switch program forwarding"
                inputProps={{ 'aria-label': 'switch program forwarding' }}
                size="small"
              />
            </div>
            <div className={`ModalForwarding__modal__content__program__dateTime ${isChecked ? "--active" : ""}`}>
              <div className="ModalForwarding__modal__content__program__date">
                <label className="ModalForwarding__modal__content__program__date__label">Fecha</label>
                <div className="ModalForwarding__modal__content__program__date__input">
                  <input type="date" name="date" id="date-forwarding" />
                </div>
              </div>
              <div className="ModalForwarding__modal__content__program__time">
                <label className="ModalForwarding__modal__content__program__time__label">Hora</label>
                <div className="ModalForwarding__modal__content__program__time__input">
                  <input type="time" name="time" id="time-forwarding" />
                </div>
              </div>
            </div>
          </div>
          <div className="ModalForwarding__modal__content__buttons">
            <button className="ModalForwarding__modal__content__buttons__button">Reenviar</button>
            <button className="ModalForwarding__modal__content__buttons__button" id="cancel-forwarding" onClick={() => {
              modals.closeModal("modal-forwarding");
              setForwardMessage(null);
            }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
