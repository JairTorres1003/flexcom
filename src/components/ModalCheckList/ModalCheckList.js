import React from "react";
import { useCheckList } from "../../hooks/useCheckList";
import { useModals } from "../../hooks/useModals";

import "./ModalCheckList.css";

export default function ModalCheckList() {
  const { modals } = useModals();
  const [isCheckList, itemSelected, editCheckList, sendCheckList] = useCheckList();

  return (
    <div className="ModalCheckList" id="modal-checkList">
      <div className="ModalCheckList__modal">
        <h2 className="ModalCheckList__modal__title">Lista de chequeo</h2>
        <div className="ModalCheckList__modal__content">
          <div className="ModalCheckList__modal__content__select">
            <select name="supervisor" id="supervisor-checkList" className="select" onChange={itemSelected}>
              <option value="">Selecciona un supervisor</option>
              <option value="1">Supervisor 1</option>
              <option value="2">Supervisor 2</option>
            </select>
            <select name="order" id="order-checkList" className="select" onChange={itemSelected}>
              <option value="">Selecciona una orden</option>
              <option value="1">Orden 1</option>
              <option value="2">Orden 2</option>
            </select>
            <select name="report" id="report-checkList" className="select" onChange={itemSelected}>
              <option value="">Selecciona un reporte</option>
              <option value="1">Reporte de segimiento de ordenes de proceso</option>
              <option value="2">Reporte de cierre de ordenes</option>
            </select>
          </div>
          <div className="ModalCheckList__modal__content__table _viewTable">
            <table className="ModalCheckList__modal__content__table__table">
              <caption className="ModalCheckList__modal__content__table__title" id="title-table-checkList">{isCheckList.titleTable}</caption>
              <thead>
                <tr>
                  <th>ITEMS</th>
                  <th>VALOR</th>
                </tr>
              </thead>
              <tbody>
                {
                  isCheckList.dataTable.map((val, index) => (
                    <tr key={index}>
                      <th className="items_table">{val.item}</th>
                      <td className="value_table" onClick={editCheckList}>{val.value}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="ModalCheckList__modal__content__buttons">
            <button className="ModalCheckList__modal__content__buttons__button" id="sendButton-checkList" onClick={sendCheckList}>Enviar</button>
            <button className="ModalCheckList__modal__content__buttons__button" onClick={() => modals.closeModal("modal-checkList")}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}