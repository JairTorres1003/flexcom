import { useState } from "react";
import swal from "sweetalert";

export const useCheckList = () => {
  const [isCheckList, setIsCheckList] = useState({
    dataTable: [],
    titleTable: 'Reporte'
  });

  const process_itemsTable = [
    "OP",
    "CODIGO -QSM / OPERARIO",
    "DESPEJE DE LINEA",
    "VERIFICAR QUE LOS CUADRES DE LOS PROCESOS SE REALICEN DE ACUERDO AL SETUP DE LA MAQUINA PREVIO REGISTRADO EN EL LUJ MODULO DE QSM",
    "HERRAMENTALES LISTOS",
    "MATERIALES LISTOS",
    "TIEMPO DE APROBACION DE CALIDAD",
    "TIEMPO SETUP DEL PEDIDO - CAUSA O CAUSAS PARETO DE TIEMPO NO PRODCUTIVO",
    "VELOCIDAD DE RODAJE",
    "SEGUIMINETO DE TIEMPO PROGRAMADO VS REAL"
  ]
  const closing_itemsTable = [
    "OP",
    "CODIGO -QSM / OPERARIO",
    "CANTIDAD EN (KG) O (UND) QUE INGRESARON",
    "CANTIDAD DE (KG) O (UND) FINALES QUE SALIERON",
    "PESO - DESPERDICIO FINAL (KG) - CAUSA PARETO",
    "PESO - REFILE (KG)",
    "LUJ O MODULO DE SETUP ACTUALIZADO DE CUADRO AL ULTIMO TRABAJO RODADO",
    "DESPEJE DE LINEA (C/NC)",
    "TOTALIZACION DE TIEMPO DE PRODUCCION (REAL VS PROGRAMADO)"
  ]

  const itemSelected = () => {
    let supervisorCheckList = document.getElementById("supervisor-checkList");
    let orderCheckList = document.getElementById("order-checkList");
    let reportCheckList = document.getElementById("report-checkList");
    let tableCheckList = document.getElementsByClassName("ModalCheckList__modal__content__table")[0];
    let sendButtonCheckList = document.getElementById("sendButton-checkList");
    let dataTable = [];
    let titleTable = 'Reporte';
    let items = [];

    if (supervisorCheckList.value === "") {
      orderCheckList.value = "";
      reportCheckList.value = "";

      orderCheckList.disabled = true;
      reportCheckList.disabled = true;
      tableCheckList.classList.add("_viewTable");
      sendButtonCheckList.disabled = true;
    } else {
      orderCheckList.disabled = false;
    }

    if (orderCheckList.value === "") {
      reportCheckList.value = "";

      reportCheckList.disabled = true;
      tableCheckList.classList.add("_viewTable");
      sendButtonCheckList.disabled = true;
    } else {
      reportCheckList.disabled = false;
    }

    if (reportCheckList.value === "") {
      tableCheckList.classList.add("_viewTable");
      sendButtonCheckList.disabled = true;
    } else {
      titleTable = reportCheckList.options[reportCheckList.selectedIndex].text;

      if (reportCheckList.value === "1") {
        items = process_itemsTable;
      }
      if (reportCheckList.value === "2") {
        items = closing_itemsTable;
      }

      for (let i = 0; i < items.length; i++) {
        dataTable.push({
          item: items[i],
          value: ""
        });
      }

      tableCheckList.classList.remove("_viewTable");
      sendButtonCheckList.disabled = false;
    }

    setIsCheckList(previousState => ({
      ...previousState,
      dataTable: dataTable,
      titleTable: titleTable
    }));
  }

  const editCheckList = () => {
    // eslint-disable-next-line no-restricted-globals
    let td = event.target;
    td.contentEditable = true;
    td.focus();
  }

  const sendCheckList = () => {
    let supervisorCheckList = document.getElementById("supervisor-checkList");
    let orderCheckList = document.getElementById("order-checkList");
    let title_table = document.getElementById("title-table-checkList");
    let items_table = document.getElementsByClassName("items_table");
    let value_table = document.getElementsByClassName("value_table");

    let val = true;
    for (let i = 0; i < value_table.length; i++) {
      if (value_table[i].innerHTML.trim() === "") {
        val = false;
        break;
      }
    }

    if (val) {
      // agrega los items y valores a un array
      let data = [];
      for (let i = 0; i < items_table.length; i++) {
        data.push({
          item: items_table[i].innerHTML,
          value: value_table[i].innerHTML
        });
      }

      let dataTable = {
        supervisor: supervisorCheckList.options[supervisorCheckList.selectedIndex].text,
        order: orderCheckList.options[orderCheckList.selectedIndex].text,
        title: title_table.innerHTML,
        data: data
      }

      console.log(dataTable);

      setIsCheckList(previousState => ({
        ...previousState,
        dataTable: [],
        titleTable: "Reporte"
      }));
    } else {
      swal({
        title: "Fallo en el envió",
        text: "Faltan datos por completar",
        icon: "warning",
        button: "Aceptar"
      })
    }
  }

  return [isCheckList, itemSelected, editCheckList, sendCheckList];

}