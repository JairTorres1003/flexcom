import React from "react";
import Moment from "react-moment";
import { HiDownload } from "react-icons/hi";
import { BsEmojiSmile, BsChatText } from "react-icons/bs";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoArrowUndo,
  IoArrowRedo,
  IoTime,
  IoStar
} from "react-icons/io5";

import "./MessagesContainer.css";
import { useMessagesContainer } from "../../hooks/useMessagesContainer";
import { useModals } from "../../hooks/useModals";
import { useForwarding } from "../../hooks/useForwarding";

export default function MessagesContainer({ msg, setMsgReply, getMsgReplys }) {
  const { 
    msgContainer, 
    handleMoveRight, 
    handleMoveLeft, 
    downloadAttachment, 
    handleReply
  } = useMessagesContainer();
  const { modals } = useModals();
  const { setForwardMessage } = useForwarding();

  if (!msg.hasOwnProperty("message")) {
    return (
      <div className="MessagesContainer create">
        <div className="MessagesContainer__header">
          <h4 className="MessagesContainer__header__name">
            Canal creado por {msg.nameFrom} el 
            <Moment fromNow format="DD/MM/YYYY HH:mm">{msg.createdAt.toDate()}</Moment>
            </h4>
        </div>
      </div>
    );
  }

  return msg.createdAt.toDate() > new Date() ? null : (
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
            <div className="MessagesContainer__body__attachments__image">
              <div className="MessagesContainer__body__attachments__image__container">
                {
                  msg.media ? msg.media.map((media, index) => {
                    let nameImg = media.split('-NM%3D')[1].split('?alt')[0];
                    return (
                      <img key={index} src={media} alt="media" title={nameImg} />
                    )
                  }) : null
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
                  msg.files ? msg.files.map((file, index) => {
                    let nameFile = file.split('-NM%3D')[1].split('?alt')[0];
                    let extension = nameFile.substring(nameFile.length - 5, nameFile.length).split(".")[1]
                    return (
                      <button className="FilesContainerPreview__chat" key={index} onClick={() => downloadAttachment(file, nameFile)} title={nameFile}>
                        <div className="FilesContainerPreview__chat__icon">
                          <HiDownload />
                        </div>
                        <label className="FilesContainerPreview__chat__name">
                          {
                            nameFile.length > 10 ? nameFile.substring(0, 10) + "..." + extension : nameFile
                          }
                        </label>
                      </button>
                    )
                  }) : null
                }
              </div>
            </div>
            <button className="arrow__move --left" onClick={handleMoveLeft}><IoChevronBackOutline /></button>
            <button className="arrow__move --Right" onClick={handleMoveRight}><IoChevronForwardOutline /></button>
          </div>
        </div>
      </div>
      <div className="MessagesContainer__footer">
        {
          msg.reply > 0 ? <button className="MessagesContainer__footer__replyButton" onClick={() => {
            setMsgReply(msg);
            handleReply();
            getMsgReplys(msg.id);
          }}>
            <BsChatText />
            Respuestas: {msg.reply}
          </button> : null
        }
      </div>
      <div className="MessagesContainer__actions">
        <button className="MessagesContainer__actions__button" onClick={() => {
          setMsgReply(msg);
          handleReply();
          getMsgReplys(msg.id);
        }}>
          <IoArrowUndo />
        </button>
        <button className="MessagesContainer__actions__button" onClick={() => {
          modals.openModal("modal-forwarding");
          setForwardMessage(msg);
        }}>
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