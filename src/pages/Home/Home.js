import React, { useState } from 'react';
import Chat from '../../components/Chat/Chat';
import Menu from '../../components/Menu/Menu';
import ModalCheckList from '../../components/ModalCheckList/ModalCheckList';
import ModalCreateChannel from '../../components/ModalCreateChannel/ModalCreateChannel';
import ModalLink from '../../components/ModalLink/ModalLink';
import ModalScheduleMessage from '../../components/ModalScheduleMessage/ModalScheduleMessage';

import './Home.css';

export default function Home() {
  // constante para la conversación actual
  const [currentChat, setCurrentChat] = useState();

  return (
    <div className="Home">
      <Menu setCurrentChat={setCurrentChat} />
      <div className="Home__chat">
        <Chat currentChat={currentChat} />
      </div>
      <div className="Modals">
        <ModalCheckList />
        <ModalCreateChannel />
        <ModalLink />
        <ModalScheduleMessage />
      </div>
    </div>
  );
}