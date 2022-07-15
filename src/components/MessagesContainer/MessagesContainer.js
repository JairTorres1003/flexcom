import React, { createRef, useEffect, useState } from "react";
import Moment from "react-moment";
import { BsEmojiSmile } from "react-icons/bs";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoArrowUndo,
  IoArrowRedo,
  IoTime,
  IoStar
} from "react-icons/io5";

import "./MessagesContainer.css";

export default function MessagesContainer({ msg }) {
  const componentRef = createRef();
  useEffect(() => {
    let width = componentRef.current.offsetWidth;
    let widthChild = componentRef.current.children[0].offsetWidth;
    if (widthChild > width) {
      componentRef.current.parentElement.children[2].classList.add("--active");
    }

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
  }, [componentRef]);

  const handleMoveRight = (e) => {
    let divFather = e.target.parentElement;
    let widthScroll = divFather.children[0].scrollWidth - divFather.children[0].offsetWidth;

    divFather.children[0].scrollLeft += 100;
    divFather.children[1].classList.add("--active");

    if (divFather.children[0].scrollLeft === widthScroll) {
      divFather.children[2].classList.remove("--active");
    }
  }

  const handleMoveLeft = (e) => {
    let divFather = e.target.parentElement;

    divFather.children[0].scrollLeft -= 100;
    divFather.children[2].classList.add("--active");
    
    if (divFather.children[0].scrollLeft === 0) {
      divFather.children[1].classList.remove("--active");
    }
  }

  return (
    <div className="MessagesContainer">
      <div className="MessagesContainer__header">
        <h4 className="MessagesContainer__header__name">{msg.nameFrom}</h4>
        <small className="MessagesContainer__header__time">
          <Moment fromNow format="DD/MM/YYYY HH:mm">{msg.createdAt.toDate()}</Moment>
        </small>
      </div>
      <div className="MessagesContainer__body">
        <div className="MessagesContainer__body__text" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
        <div className="MessagesContainer__body__attachments">
          <div className="container__attachments">
            <div className="MessagesContainer__body__attachments__image" ref={componentRef}>
              <div className="MessagesContainer__body__attachments__image__container">
                {
                  msg.media ? msg.media.map((media) => <img src={media} alt="attachment" />) : null
                }
              </div>
            </div>
            <button className="arrow__move --left" onClick={handleMoveLeft}><IoChevronBackOutline /></button>
            <button className="arrow__move --Right" onClick={handleMoveRight}><IoChevronForwardOutline /></button>
          </div>
          <div className="container__attachments">
            <div className="MessagesContainer__body__attachments__file">
              <div className="MessagesContainer__body__attachments__file__container">
                {
                  msg.files ? msg.files.map((file) => <a href={file} download>{file}</a>) : null
                }
              </div>
            </div>
            <button className="arrow__move --left" onClick={handleMoveLeft}><IoChevronBackOutline /></button>
            <button className="arrow__move --Right" onClick={handleMoveRight}><IoChevronForwardOutline /></button>
          </div>
        </div>
      </div>
      <div className="MessagesContainer__footer">
        <button className="MessagesContainer__footer__replyButton">
          {msg.isReply ? <IoArrowUndo /> : null}
          {msg.isReply ? `Respuesta: ${msg.replyMsg}` : null}
        </button>
      </div>
      <div className="MessagesContainer__actions">
        <button className="MessagesContainer__actions__button">
          <IoArrowUndo />
        </button>
        <button className="MessagesContainer__actions__button">
          <IoArrowRedo />
        </button>
        <button className="MessagesContainer__actions__button">
          <IoTime />
        </button>
        <button className="MessagesContainer__actions__button">
          <IoStar />
        </button>
        <button className="MessagesContainer__actions__button">
          <BsEmojiSmile />
        </button>
      </div>
    </div>
  );
}