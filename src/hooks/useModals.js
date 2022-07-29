import { useState } from 'react';
import swal from 'sweetalert';

export const useModals = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = (modalID) => {
    let modal = document.getElementById(modalID);
    modal.classList.add("is-open");
    modal.children[0].style.setProperty('--animate-duration', '.2s');
    setIsOpenModal(true);
    clearDataModal(modalID);
  }
  const closeModal = (modalID) => {
    let modal = document.getElementById(modalID);
    modal.classList.remove("is-open");
    modal.children[0].removeAttribute('style');
    setIsOpenModal(false);
  }

  const clearDataModal = (modalID) => {
    if (modalID === "modal-checkList") {
      let supervisorCheckList = document.getElementById("supervisor-checkList");
      let orderCheckList = document.getElementById("order-checkList");
      let reportCheckList = document.getElementById("report-checkList")
      let sendButtonCheckList = document.getElementById("sendButton-checkList");


      supervisorCheckList.value = "";
      orderCheckList.value = "";
      reportCheckList.value = "";

      orderCheckList.disabled = true;
      reportCheckList.disabled = true;

      document.getElementsByClassName("ModalCheckList__modal__content__table")[0].classList.add("_viewTable");

      sendButtonCheckList.disabled = true;
    }
    if (modalID === "modal-createChannel") {
      let name_channel = document.getElementById('name-channel');
      name_channel.value = '';
      name_channel.classList.remove('--required');
      document.getElementById('description-channel').value = '';
    }
    if (modalID === "modal-link") {
      let text = document.getElementById('input-text');
      let link = document.getElementById('input-link');
      let scnStart = document.getElementById('scnStart');
      text.value = '';
      link.value = '';
      text.classList.remove('--required');
      link.classList.remove('--required');

      let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
      let caretPosEl = getCaretCharacterOffsetWithin(textEditDivTextarea);
      scnStart.innerHTML = caretPosEl;
    }
    if (modalID === "modal-scheduleMessage") {
      let today = new Date();
      let todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      let dateMin = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0];
      let dateMax = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().split('T')[0];
      let hour = today.getHours();
      let minute = today.getMinutes() + 5;
      let text = document.getElementsByClassName('TextEdit__container__text__textarea')[0];
      let file = document.getElementsByClassName('TextEdit__container__files__file__preview')[0].childElementCount;
      let image = document.getElementsByClassName('TextEdit__container__files__image__preview')[0].childElementCount;

      if (minute > 59) {
        hour++;
        minute = minute - 59;
      }

      hour = (hour < 10 ? '0' : '') + hour;
      minute = (minute < 10 ? '0' : '') + minute;


      document.getElementById('date-scheduleMessage').valueAsDate = new Date(todayDate);
      document.getElementById('date-scheduleMessage').min = dateMin;
      document.getElementById('date-scheduleMessage').max = dateMax;
      document.getElementById('time-scheduleMessage').value = `${hour}:${minute}`;
      document.getElementById('time-scheduleMessage').min = `${hour}:${minute}`;
      document.getElementById('text-scheduleMessage').innerHTML = text.innerText.trim() !== '' ? text.innerHTML : '';
      document.getElementById('file-scheduleMessage').innerHTML = `+ ${file} ${file === 1 ? 'Archivo' : 'Archivos'}`;
      document.getElementById('image-scheduleMessage').innerHTML = `+ ${image} ${image === 1 ? 'Imagen' : 'Imágenes'}`;
      
      if (text.innerText.trim() === '' && file === 0 && image === 0) {
        swal({
          title: "Agregue un mensaje o un archivo",
          text: "Para poder programar un mensaje, debe escribir algo en el editor de texto o adjuntar un archivo.",
          icon: "warning",
          button: "Ok"
        });
        closeModal('modal-scheduleMessage');
      }
    }
  }

  const getCaretCharacterOffsetWithin = (element) => {
    let caretOffset = 0;
    let doc = element.ownerDocument || element.document;
    let win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        let range = win.getSelection().getRangeAt(0);
        let preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type !== "Control") {
      let textRange = sel.createRange();
      let preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

  return { modals: { isOpenModal, openModal, closeModal } };
}