import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { IoArrowRedo, IoChevronBackOutline, IoChevronForwardOutline, IoStar, IoTime } from 'react-icons/io5';
import Moment from 'react-moment';
import { useMessagesContainer } from '../../hooks/useMessagesContainer';

import "./MessagesReply.css";

export default function MessagesReply({ msg }) {
  const { 
    msgContainer, 
    handleMoveRight, 
    handleMoveLeft, 
    downloadAttachment
  } = useMessagesContainer();

  return (
    <div className="MessagesReply">
      <div className="MessagesReply__header">
        <h4 className="MessagesReply__header__name">{msg.nameFrom}</h4>
        <small className="MessagesReply__header__time">
          <Moment fromNow format="DD/MM/YYYY HH:mm">{msg.createdAt.toDate()}</Moment>
          <sapn className="MessagesReply__header__time__tm">{msg.id}</sapn>
        </small>
      </div>
      <div className="MessagesReply__body">
        <div className="MessagesReply__body__text" dangerouslySetInnerHTML={{ __html: msg.message }}></div>
        <div className="MessagesReply__body__attachments">
          <div className="Reply__attachments">
            <div className="MessagesReply__body__attachments__image">
              <div className="MessagesReply__body__attachments__image__container">
                {
                  msg.media ? msg.media.map((media) => {
                    let nameImg = media.split('-NM%3D')[1].split('?alt')[0];
                    return (
                      <img src={media} alt="media" title={nameImg} />
                    )
                  }) : null
                }
              </div>
            </div>
            <button className="arrow__move --left" onClick={handleMoveLeft}><IoChevronBackOutline /></button>
            <button className="arrow__move --Right" onClick={handleMoveRight}><IoChevronForwardOutline /></button>
          </div>
          <div className="Reply__attachments">
            <div className="MessagesReply__body__attachments__file">
              <div className="MessagesReply__body__attachments__file__container">
                {
                  msg.files ? msg.files.map((file) => {
                    let nameFile = file.split('-NM%3D')[1].split('?alt')[0];
                    let extension = nameFile.substring(nameFile.length - 5, nameFile.length).split(".")[1]
                    return (
                      <button className="FilesReplyPreview__chat" onClick={() => downloadAttachment(file, nameFile)} title={nameFile}>
                        <div className="FilesReplyPreview__chat__icon">
                          <HiDownload />
                        </div>
                        <label className="FilesReplyPreview__chat__name">
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
      <div className="MessagesReply__actions">
        <button className="MessagesReply__actions__button">
          <IoArrowRedo />
        </button>
        <button className="MessagesReply__actions__button">
          <IoTime />
        </button>
        <button className="MessagesReply__actions__button">
          <IoStar />
        </button>
        <button className="MessagesReply__actions__button">
          <BsEmojiSmile />
        </button>
      </div>
    </div>
  );
}
