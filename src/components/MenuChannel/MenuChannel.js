import React from "react";
import { IoAdd } from "react-icons/io5";
import { useChannel } from "../../hooks/useChannel";
import { useModals } from "../../hooks/useModals";
import ChannelList from "../ChannelList/ChannelList";

import "./MenuChannel.css";

export default function MenuChannel({ setCurrentChat }) {
  const { modals } = useModals();
  const { listChannels }= useChannel();

  return (
    <div className="MenuChannel">
      <h2 className="MenuChannel__title">Canales</h2>
      <div className="MenuChannel__button">
        <button className="MenuChannel__button__createChannel" id="button-createChannel" onClick={() => modals.openModal("modal-createChannel")}>
          <IoAdd className="MenuChannel__button__createChannel__icon" />
          <p>Crea un nuevo canal</p>
        </button>
      </div>
      <div className="MenuChannel__list">
        <ul className="MenuChannel__list-list">
          {
            listChannels ?  listChannels.map((channel, index) => {
              return <ChannelList 
                key={index}
                channel={channel}
                setCurrentChat={setCurrentChat}
                />
            }) : null
          }
        </ul>
      </div>
    </div>
  )
}
