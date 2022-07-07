import React from "react";
import { useModals } from "../../hooks/useModals";


import "./ModalScheduleMessage.css";

export default function ModalScheduleMessage() {
  const { modals } = useModals();

  return (
    <div className="ModalScheduleMessage" id="modal-scheduleMessage">
      <div className="ModalScheduleMessage__modal">
        <h2 className="ModalScheduleMessage__modal__title">Programa un nuvo mensaje</h2>
        <div className="ModalScheduleMessage__modal__content">
          <div className="ModalScheduleMessage__modal__content__program">
            <div className="ModalScheduleMessage__modal__content__program__date">
              <label className="ModalScheduleMessage__modal__content__program__date__label">Fecha</label>
              <div className="ModalScheduleMessage__modal__content__program__date__input">
                <input type="date" name="date" id="date-scheduleMessage" />
              </div>
            </div>
            <div className="ModalScheduleMessage__modal__content__program__time">
              <label className="ModalScheduleMessage__modal__content__program__time__label">Hora</label>
              <div className="ModalScheduleMessage__modal__content__program__time__input">
                <input type="time" name="time" id="time-scheduleMessage" />
              </div>
            </div>
          </div>
          <div className="ModalScheduleMessage__modal__content__message">
            <label className="ModalScheduleMessage__modal__content__message__label">Mensaje</label>
            <textarea id="input-scheduleMessage" className="ModalScheduleMessage__modal__content__message__textarea" placeholder="Escribe tu mensaje aquí..."></textarea>
          </div>
          <div className="ModalScheduleMessage__modal__content__buttons">
            <button className="ModalScheduleMessage__modal__content__buttons__button">Programar</button>
            <button className="ModalScheduleMessage__modal__content__buttons__button" onClick={() => modals.closeModal("modal-scheduleMessage")}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
