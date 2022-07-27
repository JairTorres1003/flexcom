import { useState } from 'react';

export const useModals = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = (modalID) => {
    let modal = document.getElementById(modalID);
    modal.classList.add("is-open");
    setIsOpenModal(true);
    clearDataModal(modalID);
  }
  const closeModal = (modalID) => {
    let modal = document.getElementById(modalID);
    modal.classList.remove("is-open");
    setIsOpenModal(false);
    clearDataModal(modalID);
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
      document.getElementById('visibility-channel').checked = false;
      document.getElementsByClassName('ModalCreateChannel__modal__content__invite')[0].classList.add('--public');
      document.getElementById('search-invited').value = '';
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
      let date_time = new Date();
      let dateMin = new Date(date_time.getFullYear(), date_time.getMonth(), date_time.getDate()).toISOString().split('T')[0];
      let dateMax = new Date(date_time.getFullYear(), date_time.getMonth() + 1, date_time.getDate()).toISOString().split('T')[0];
      let hour = date_time.getHours();
      let minute = date_time.getMinutes();
      hour = (hour < 10 ? '0' : '') + hour;
      minute = (minute < 10 ? '0' : '') + minute;

      document.getElementById('date-scheduleMessage').valueAsDate = date_time;
      document.getElementById('date-scheduleMessage').min = dateMin;
      document.getElementById('date-scheduleMessage').max = dateMax;
      document.getElementById('time-scheduleMessage').value = `${hour}:${minute}`;
      document.getElementById('input-scheduleMessage').value = '';
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