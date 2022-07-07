/* eslint-disable no-restricted-globals */
import { useState } from 'react';


export const useTextEdit = () => {
  const [isTextEdit, setTextEdit] = useState({
    dataFiles: [],
    dataImages: []
  });

  // funcion que quita el span placeholder cuando se escribe en el div textarea
  const handleTextEdit = () => {
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
    let textEditSpanPlaceholder = document.getElementById("textEdit-spanPlaceholder");

    if (textEditDivTextarea.innerHTML !== '<p><br></p>') {
      textEditSpanPlaceholder.classList.add("_write");
    } else {
      textEditSpanPlaceholder.classList.remove("_write");
      textEditDivTextarea.innerHTML = '<p><br></p>';
    }
    if (textEditDivTextarea.innerHTML === '') {
      textEditSpanPlaceholder.classList.remove("_write");
      textEditDivTextarea.innerHTML = '<p><br></p>';
    }
  }

  // Si se oprime sobre el span placeholder, se pone el div textarea en foco
  const clickTextEdit = () => {
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
    textEditDivTextarea.focus();
  }

  // funcion que da formato al texto (texto enriquecido) | (rich text editor)
  const formatText = (sCmd, sValue) => {
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");

    textEditDivTextarea.focus();
    document.execCommand(sCmd, false, sValue);
    textEditDivTextarea.focus();

    if (sCmd === "insertorderedlist" || sCmd === "insertunorderedlist") {
      let range = document.createRange();
      range.selectNodeContents(textEditDivTextarea);
      range.collapse(false);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    handleTextEdit();
  }

  // envia el mensaje al hacer click en el boton enviar
  const sendMessage = () => {
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
    let ChatMessages = document.getElementsByClassName("Chat__messages")[0];
    let name_user = document.getElementById('name-user');

    let msgObject = {
      msg: textEditDivTextarea.innerHTML,
      date: new Date().toLocaleString(),
      user: name_user.innerHTML,
      reply: false,
      files: {
        dataFiles: isTextEdit.dataFiles,
        dataImages: isTextEdit.dataImages
      }
    }
    console.log(msgObject);

    let msg = document.createElement("div");
    msg.classList.add("msg__container");

    let msg_header = document.createElement("div");
    msg_header.classList.add("msg__container__header");

    let msg_header_user = document.createElement("h4");
    msg_header_user.classList.add("msg__container__header__user");
    msg_header_user.innerHTML = msgObject.user;

    let msg_header_date = document.createElement("span");
    msg_header_date.classList.add("msg__container__header__date");
    msg_header_date.innerHTML = msgObject.date;

    let msg_body = document.createElement("div");
    msg_body.classList.add("msg__container__body");

    let msg_body_text = document.createElement("div");
    msg_body_text.classList.add("msg__container__body__text");
    msg_body_text.innerHTML = msgObject.msg;

    let msg_body_files = document.createElement("div");
    msg_body_files.classList.add("msg__container__body__files");
    if (msgObject.files.dataFiles.length > 0) {
      msg_body_files.innerHTML = `<p>Archivos:${msgObject.files.dataFiles.length}</p>`;
    }

    let msg_body_files_images = document.createElement("div");
    msg_body_files_images.classList.add("msg__container__body__files__images");
    if (msgObject.files.dataImages.length > 0) {
      msg_body_files_images.innerHTML = `<p>Imágenes:${msgObject.files.dataImages.length}</p>`;
    }

    let msg_actions = document.createElement("div");
    msg_actions.classList.add("msg__actions");
    msg_actions.innerHTML = 'reservado para acciones';

    msg_header.appendChild(msg_header_user);
    msg_header.appendChild(msg_header_date);

    msg_body.appendChild(msg_body_text);
    msg_body.appendChild(msg_body_files);
    msg_body.appendChild(msg_body_files_images);

    msg.appendChild(msg_header);
    msg.appendChild(msg_body);
    msg.appendChild(msg_actions);

    ChatMessages.appendChild(msg);

    // posiciona el scroll al final del chat 
    ChatMessages.scrollTop = ChatMessages.scrollHeight;
    textEditDivTextarea.innerHTML = '';
    handleTextEdit();
  }

  // añade el emoji al texto (¡pendiente!)
  const addEmoji = (emojiObj) => {
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
    setCurrentCursorPosition(emojiObj.position, textEditDivTextarea);
    console.log(emojiObj);
    formatText("insertHTML", emojiObj.emojiObject.emoji);
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

  const createRange = (node, chars, range) => {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (let lp = 0; lp < node.childNodes.length; lp++) {
          range = createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
    }
    return range;
  };

  const setCurrentCursorPosition = (chars, node) => {
    if (chars >= 0) {
      let selection = window.getSelection();

      let range = createRange(node, { count: chars });

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // cuando el mouse entra y sale de un boton
  const handleMouseOver = (nCtrl) => {
    let btn = event.target;
    let span = document.createElement("span");
    span.classList.add("span_buttonTools_title");
    // si es mac se le agrega el atajo de mac
    if (window.navigator.platform.indexOf('mac') > -1) {
      span.innerHTML = ctrl[nCtrl].mac;
    } else {
      span.innerHTML = ctrl[nCtrl].win;
    }
    btn.appendChild(span);
  }
  const handleMouseOut = () => {
    let btn = event.target;
    if (btn.childNodes.length > 1) {
      btn.removeChild(btn.childNodes[1]);
    }
  }

  // atajos de teclado para cada boton de herramientas en windows o mac
  const ctrl = [
    // subir un archivo
    { win: "Ctrl+O", mac: "Command+O" },
    // agregar una lista de chequeo
    { win: "Ctrl+L", mac: "Command+L" },
    // subir una imagen
    { win: "Ctrl+ shift+I", mac: "Command+ shift+I" },
    // mencionar a un usuario
    { win: "Ctrl+M", mac: "Command+M" },
    // insertar emoji
    { win: "Ctrl+E", mac: "Command+E" },
    // programar un mensaje
    { win: "Ctrl+P", mac: "Command+P" },
    // insertar texto en negrita
    { win: "Ctrl+B", mac: "Command+B" },
    // insertar texto en cursiva
    { win: "Ctrl+I", mac: "Command+I" },
    // insertar texto tachado
    { win: "Ctrl+ shift+S", mac: "Command+ shift+S" },
    // insertar texto subrayado
    { win: "Ctrl+U", mac: "Command+U" },
    // insertar enlace
    { win: "Ctrl+K", mac: "Command+K" },
    // insertar lista desordenada
    { win: "Ctrl+ shift+U", mac: "Command+ shift+U" },
    // insertar lista ordenada
    { win: "Ctrl+ shift+O", mac: "Command+ shift+O" },
    // enviar mensaje
    { win: "Ctrl+Enter", mac: "Command+ Enter" }
  ];

  const controlKey = () => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "o") {
        event.preventDefault();
        document.getElementById("btnTool-file").click();
      }
      if (event.key === "l") {
        event.preventDefault();
        document.getElementById("btnTool-checklist").click();
      }
      if (event.shiftKey && event.key === "I") {
        event.preventDefault();
        document.getElementById("btnTool-image").click();
      }
      if (event.key === "m") {
        event.preventDefault();
        document.getElementById("btnTool-mention").click();
      }
      if (event.key === "e") {
        event.preventDefault();
        document.getElementById("btnTool-emoji").click();
      }
      if (event.key === "p") {
        event.preventDefault();
        document.getElementById("btnTool-schedule").click();
      }
      if (event.key === "b") {
        event.preventDefault();
        formatText("bold");
      }
      if (event.key === "i") {
        event.preventDefault();
        formatText("italic");
      }
      if (event.shiftKey && event.key === "S") {
        event.preventDefault();
        formatText("strikethrough");
      }
      if (event.key === "u") {
        event.preventDefault();
        formatText("underline");
      }
      if (event.key === "k") {
        event.preventDefault();
        document.getElementById("btnTool-link").click();
      }
      if (event.shiftKey && event.key === "U") {
        event.preventDefault();
        formatText("insertunorderedlist");
      }
      if (event.shiftKey && event.key === "O") {
        event.preventDefault();
        formatText("insertorderedlist");
      }
      if (event.shiftKey === false && event.key === "Enter") {
        event.preventDefault();
        document.getElementById("send-button").click();
      }
    }
  }

  const openFile = () => {
    let file = document.getElementById("file-document");
    file.click();
  }
  const openImage = () => {
    let file = document.getElementById("file-image");
    file.click();
  }

  // previsualizacion de los archivos
  const previewFile = (e) => {
    let dataFiles = isTextEdit.dataFiles;
    let file = e.target.files;
    let preview = document.getElementsByClassName("TextEdit__container__files__file__preview")[0];
    for (let i = 0; i < file.length; i++) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let div = document.createElement("div");
        let divImg = document.createElement("div");
        let spanFile = document.createElement("span");
        let span = document.createElement("span");

        div.classList.add("file_preview");
        let name = file[i].name;
        let extension = name.substring(name.length - 5, name.length).split(".")[1];
        if (name.length > 8) {
          name = name.substring(0, 8) + "..." + extension;
        }
        div.title = name;

        span.innerHTML = "X";
        span.id = "fileView_" + preview.childElementCount;
        span.onclick = deletePreviewFiles;


        spanFile.innerHTML = extension;

        divImg.appendChild(spanFile);

        dataFiles.push(file[i]);

        div.appendChild(divImg);
        div.appendChild(span);
        preview.appendChild(div);
      }
      reader.readAsDataURL(file[i]);
    }
    setTextEdit(previusState => {
      return {
        ...previusState,
        dataFiles: dataFiles
      }
    })
  }
  const previewImage = (e) => {
    let dataImages = isTextEdit.dataImages;
    let file = e.target.files;
    let supportedTypes = ["image/png", "image/jpeg", "image/gif"];
    let preview = document.getElementsByClassName("TextEdit__container__files__image__preview")[0];
    for (let i = 0; i < file.length; i++) {
      if (supportedTypes.includes(file[i].type)) {
        let reader = new FileReader();
        reader.onload = (e) => {
          let div = document.createElement("div");
          let img = document.createElement("img");
          let span = document.createElement("span");

          div.classList.add("image_preview");
          let name = file[i].name;
          if (name.length > 8) {
            name = name.substring(0, 8) + "..." + file[i].type.split("image/")[1];
          }
          div.title = name;

          span.innerHTML = "X";
          span.id = "imageView_" + preview.childElementCount;
          span.onclick = deletePreviewImages;

          img.src = e.target.result;

          dataImages.push(file[i]);

          div.appendChild(img);
          div.appendChild(span);
          preview.appendChild(div);
        }
        reader.readAsDataURL(file[i]);
      }
    }
    setTextEdit(previusState => {
      return {
        ...previusState,
        dataImages: dataImages
      }
    })
  }

  // Eliminar la previsualizacion de los archivos
  const deletePreviewFiles = (e) => {
    let files = document.getElementsByClassName("file_preview");
    let span = e.target;
    let id = parseInt(span.id.split("_")[1]);
    let dataFiles = isTextEdit.dataFiles;
    dataFiles.splice(id, 1);
    setTextEdit(previusState => {
      return {
        ...previusState,
        dataFiles: dataFiles
      }
    })
    files[id].remove();

    for (let i = id; i < files.length; i++) {
      files[i].children[1].id = "fileView_" + i;
    }

  }
  const deletePreviewImages = (e) => {
    let images = document.getElementsByClassName("image_preview");
    let span = e.target;
    let id = parseInt(span.id.split("_")[1]);
    let dataImages = isTextEdit.dataImages;
    dataImages.splice(id, 1);
    setTextEdit(previusState => {
      return {
        ...previusState,
        dataImages: dataImages
      }
    })
    images[id].remove();

    for (let i = id; i < images.length; i++) {
      images[i].children[1].id = "imageView_" + i;
    }
  }


  return {textEdits:{
    isTextEdit,
    handleTextEdit,
    clickTextEdit,
    formatText,
    sendMessage,
    addEmoji,
    getCaretCharacterOffsetWithin,
    handleMouseOver,
    handleMouseOut,
    controlKey,
    openFile,
    openImage,
    previewFile,
    previewImage
  }};
}