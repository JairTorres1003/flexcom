import React, { useContext } from "react";
import { RiHashtag } from "react-icons/ri";
import { VscLock } from "react-icons/vsc";
import { AuthContext } from "../../context/authProvider";


import "./ChannelList.css";

export default function ChannelList({ channel, setCurrentChat, updateLastConversation }) {
  const { user } = useContext(AuthContext);

  if (channel.visibility === "private") {
    if (channel.members.includes(user.uid)) {
      return (
        <li className="ChannelList-channel" onClick={() => {
          setCurrentChat(channel);
          updateLastConversation(channel.id);
        }}>
          <VscLock className="ChannelList-channel__icon" />
          <p>{channel.name}</p>
        </li>
      );
    }
  } else {
    return (
      <li className="ChannelList-channel" onClick={() => {
        setCurrentChat(channel);
        updateLastConversation(channel.id);
      }}>
        <RiHashtag className="ChannelList-channel__icon" />
        <p>{channel.name}</p>
      </li>
    );
  }
}