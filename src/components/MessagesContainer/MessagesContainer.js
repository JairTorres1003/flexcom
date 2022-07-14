import React from "react";
import Moment from "react-moment";

import "./MessagesContainer.css";

export default function MessagesContainer({ msg }) {

  return (
    <div className="MessagesContainer">
      <div className="MessagesContainer__header">
        <h4 className="MessagesContainer__header__name">{msg.nameFrom}</h4>
        <small className="MessagesContainer__header__time">
          <Moment fromNow format="DD/MM/YYYY HH:mm">{msg.createdAt.toDate()}</Moment>
        </small>
      </div>
      <div className="MessagesContainer__body">
        <div className="MessagesContainer__body__text"></div>
        <div className="MessagesContainer__body__attachments">
          <div className="MessagesContainer__body__attachments__image">
            {
              msg.media ? msg.media.map((media) => <img src={media} alt="attachment" />) : null
            }
          </div>
          <div className="MessagesContainer__body__attachments__file"></div>
        </div>
      </div>
      <div className="MessagesContainer__footer"></div>
      <div className="MessagesContainer__actions"></div>
    </div>
  );
}