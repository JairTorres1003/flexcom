import React from "react";
import { RiHashtag } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";


import "./ChannelList.css";

export default function ChannelList({ channel, visibility }) {
  return (
    <li className="ChannelList-channel">
      {visibility === "public" ? (
        <RiHashtag className="ChannelList-channel__icon" />
      ) : (
        <VscLock className="ChannelList-channel__icon" />
      )}
      <p>{channel}</p>
    </li>
  );
}