import React from "react";
import { useLink } from "../../hooks/useLink";
import { useModals } from "../../hooks/useModals";

import "./ModalLink.css";

export default function ModalLink() {
  const { modals } = useModals();
  const [link, sendLink] = useLink();

  return (
    <div className="ModalLink" id="modal-link">
      <div className="ModalLink__modal">
        <h2 className="ModalLink__modal__title">Agrega un nuevo vinculo</h2>
        <div className="ModalLink__modal__content">
          <div className="ModalLink__modal__content__text">
            <label className="ModalLink__modal__content__text__label">Texto</label>
            <input type="text" id="input-text" className="ModalLink__modal__content__text__input" />
          </div>
          <div className="ModalLink__modal__content__link">
            <label className="ModalLink__modal__content__link__label">Enlace</label>
            <input type="text" id="input-link" className="ModalLink__modal__content__link__input" />
          </div>
          <div className="ModalLink__modal__content__buttons">
            <button className="ModalLink__modal__content__buttons__button" onClick={sendLink}>Agregar</button>
            <button className="ModalLink__modal__content__buttons__button" onClick={() => modals.closeModal("modal-link")}>Cancelar</button>
          </div>
          <span id="scnStart">0</span>
        </div>
      </div>
    </div>
  );
}
