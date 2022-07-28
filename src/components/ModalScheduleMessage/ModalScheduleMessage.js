import React from "react";
import { ImFileEmpty } from "react-icons/im";
import { IoImageOutline } from "react-icons/io5";
import { useModals } from "../../hooks/useModals";
import { useScheduleMessage } from "../../hooks/useScheduleMessage";

import "./ModalScheduleMessage.css";

export default function ModalScheduleMessage() {
  const { modals } = useModals();
  const { scheduleMessage, setScheduleMessage, checkDateTime, sendScheduleMessage } = useScheduleMessage();

  return (
    <div className="ModalScheduleMessage" id="modal-scheduleMessage">
      <div className="ModalScheduleMessage__modal">
        <h2 className="ModalScheduleMessage__modal__title">Programa un nuvo mensaje</h2>
        <div className="ModalScheduleMessage__modal__content">
          <div className="ModalScheduleMessage__modal__content__program">
            <div className="ModalScheduleMessage__modal__content__program__date">
              <label className="ModalScheduleMessage__modal__content__program__date__label">Fecha</label>
              <div className="ModalScheduleMessage__modal__content__program__date__input">
                <input type="date" name="date" id="date-scheduleMessage" onChange={checkDateTime} />
              </div>
            </div>
            <div className="ModalScheduleMessage__modal__content__program__time">
              <label className="ModalScheduleMessage__modal__content__program__time__label">Hora</label>
              <div className="ModalScheduleMessage__modal__content__program__time__input">
                <input type="time" name="time" id="time-scheduleMessage" onChange={checkDateTime} />
              </div>
            </div>
          </div>
          <div className="ModalScheduleMessage__modal__content__message">
            <label className="ModalScheduleMessage__modal__content__message__label">Mensaje</label>
            <div className="ModalScheduleMessage__modal__content__message__data">
              <div className="ModalScheduleMessage__modal__content__message__data__text" id="text-scheduleMessage"></div>
              <div className="ModalScheduleMessage__modal__content__message__data__attachments">
                <div className="ModalScheduleMessage__modal__content__message__data__attachments__file">
                  <ImFileEmpty />
                  <span id="file-scheduleMessage"></span>
                </div>
                <div className="ModalScheduleMessage__modal__content__message__data__attachments__image">
                  <IoImageOutline />
                  <span id="image-scheduleMessage"></span>
                </div>
              </div>
              <span className="ModalScheduleMessage__modal__content__message__data__dateTime">
                {scheduleMessage ? scheduleMessage : ""}
              </span>
            </div>
          </div>
          <div className="ModalScheduleMessage__modal__content__buttons">
            <button className="ModalScheduleMessage__modal__content__buttons__button" onClick={sendScheduleMessage}>Programar</button>
            <button className="ModalScheduleMessage__modal__content__buttons__button" id="cancel-scheduleMessage" onClick={() => {
              modals.closeModal("modal-scheduleMessage");
              setScheduleMessage(null);
            }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
