/* eslint-disable default-case */
/* eslint-disable no-restricted-globals */
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authProvider';
import { db, storage } from '../firebase/firebaseConfig';


export const useTextEdit = ({ currentChat }) => {
  const [isTextEdit, setTextEdit] = useState({
    dataFiles: [],
    dataImages: []
  });
  const { user } = useContext(AuthContext)

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
  const sendMessage = (e) => {
    e.preventDefault();
    let textEditDivTextarea = document.getElementById("textEdit-divTextarea");
    let ChatMessages = document.getElementsByClassName("Chat__messages")[0];
    let textEditFilePreview = document.getElementsByClassName("TextEdit__container__files__file__preview")[0];
    let textEditImagePreview = document.getElementsByClassName("TextEdit__container__files__image__preview")[0];
    const ChatReply = document.getElementsByClassName("Chat__reply")[0];

    if (textEditDivTextarea.innerText.trim() !== "" || isTextEdit.dataFiles.length > 0 || isTextEdit.dataImages.length > 0) {
      let userOne = user.uid;
      let userTwo = 0;
      let chatId = 0;
      let message = "";

      if (textEditDivTextarea.innerText.trim() !== "") {
        message = textEditDivTextarea.innerHTML;
      } 

      if (currentChat) {
        if (currentChat.hasOwnProperty("visibility")) {
          chatId = currentChat.id;
          userTwo = currentChat.id;
        } else {
          userTwo = currentChat.uid;
          if (userOne !== userTwo) {
            chatId = userOne > userTwo ? `${userOne}+${userTwo}` : `${userTwo}+${userOne}`
          } else {
            chatId = userOne;
          }
        }
        const handleSendMessage = async () => {
          let urlImg = [];
          let urlFile = [];

          if (isTextEdit.dataImages.length > 0) {
            for (let i = 0; i < isTextEdit.dataImages.length; i++) {
              const image = isTextEdit.dataImages[i];
              const imageRef = ref(storage, `chats/${chatId}/images/${new Date().getTime()}-NM=${image.name}`);
              const snap = await uploadBytes(imageRef, image);
              const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
              urlImg.push(dlUrl);
            }
          }

          if (isTextEdit.dataFiles.length > 0) {
            for (let i = 0; i < isTextEdit.dataFiles.length; i++) {
              const file = isTextEdit.dataFiles[i];
              const fileRef = ref(storage, `chats/${chatId}/files/${new Date().getTime()}-NM=${file.name}`);
              const snap = await uploadBytes(fileRef, file);
              const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
              urlFile.push(dlUrl);
            }
          }

          if (ChatReply.classList.contains("--replyActive")) {
            let idMsg = document.getElementsByClassName("MessagesReply__header__time__tm")[0].innerHTML;
            let id = "rp" + new Date().getTime();
            await setDoc(doc(db, 'messages', chatId, 'chat', idMsg, 'reply', id), {
              message: message,
              nameFrom: user.displayName,
              from: userOne,
              to: userTwo,
              createdAt: Timestamp.fromDate(new Date()),
              media: urlImg,
              files: urlFile,
              id: id
            });
          } else {
            let id = "msg" + new Date().getTime();
            await setDoc(doc(db, 'messages', chatId, 'chat', id), {
              message: message,
              nameFrom: user.displayName,
              from: userOne,
              to: userTwo,
              createdAt: Timestamp.fromDate(new Date()),
              media: urlImg,
              files: urlFile,
              id: id
            });
          }

          await setDoc(doc(db, 'messages/' + chatId), {
            id: chatId
          });
        }
        handleSendMessage();

        ChatMessages.scrollTop = ChatMessages.scrollHeight;
        textEditDivTextarea.innerHTML = '';
        textEditFilePreview.innerHTML = '';
        textEditImagePreview.innerHTML = '';
        handleTextEdit();
        setTextEdit({
          ...isTextEdit,
          dataFiles: [],
          dataImages: []
        });
      }
    }
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


  return {
    textEdits: {
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
    }
  };
}