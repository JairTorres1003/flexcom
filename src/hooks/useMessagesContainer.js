import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/firebaseConfig";

export const useMessagesContainer = () => {
  const [msgContainer, setMsgContainer] = useState(null);

  const ChatMessages = document.getElementsByClassName("Chat__messages")[0];
  let resizeObserver = new ResizeObserver(() => {
    const fatherImg = document.getElementsByClassName("MessagesContainer__body__attachments__image");
    const fatherFile = document.getElementsByClassName("MessagesContainer__body__attachments__file");

    for (let i = 0; i < fatherImg.length; i++) {
      let Fw = fatherImg[i].offsetWidth;
      let Cw = fatherImg[i].children[0].offsetWidth;
      if (Cw > Fw) {
        fatherImg[i].parentElement.children[2].classList.add("--active");
      } else {
        fatherImg[i].parentElement.children[2].classList.remove("--active");
        fatherImg[i].parentElement.children[1].classList.remove("--active");
      }
    }

    for (let i = 0; i < fatherFile.length; i++) {
      let Fw = fatherFile[i].offsetWidth;
      let Cw = fatherFile[i].children[0].offsetWidth;
      if (Cw > Fw) {
        fatherFile[i].parentElement.children[2].classList.add("--active");
      } else {
        fatherFile[i].parentElement.children[2].classList.remove("--active");
        fatherFile[i].parentElement.children[1].classList.remove("--active");
      }
    }
  })
  resizeObserver.observe(ChatMessages);

  const handleMoveRight = (e) => {
    let divFather = e.target.parentElement;
    let widthScroll = divFather.children[0].scrollWidth - divFather.children[0].offsetWidth;
    let move = 0;

    let interval = setInterval(() => {
      move += 10;
      divFather.children[0].scrollLeft += move;
      divFather.children[1].classList.add("--active");

      if (move === 100) {
        clearInterval(interval);
      }

      if (divFather.children[0].scrollLeft === widthScroll) {
        divFather.children[2].classList.remove("--active");
        clearInterval(interval);
      }
    }, 10);
  }

  const handleMoveLeft = (e) => {
    let divFather = e.target.parentElement;
    let move = 100;
    let interval = setInterval(() => {
      move -= 10;
      divFather.children[0].scrollLeft -= move;
      divFather.children[2].classList.add("--active");

      if (move === 0) {
        clearInterval(interval);
      }

      if (divFather.children[0].scrollLeft === 0) {
        divFather.children[1].classList.remove("--active");
        clearInterval(interval);
      }
    }, 10);
  }

  const downloadAttachment = (urlFile, nameFile) => {
    console.log(urlFile, nameFile);
    axios({
      url: urlFile,
      method: "GET",
      responseType: "blob"  // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nameFile);
      document.body.appendChild(link);
      link.click();
    });
  }

  return { msgContainer, handleMoveRight, handleMoveLeft, downloadAttachment };
}
