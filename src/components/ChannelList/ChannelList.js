import React from "react";
import { RiHashtag } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";


import "./ChannelList.css";

export default function ChannelList({ channel, setCurrentChat }) {
  return (
    <li className="ChannelList-channel" onClick={() => setCurrentChat(channel)}>
      {channel.visibility === "public" ? (
        <RiHashtag className="ChannelList-channel__icon" />
      ) : (
        <VscLock className="ChannelList-channel__icon" />
      )}
      <p>{channel.name}</p>
    </li>
  );
}