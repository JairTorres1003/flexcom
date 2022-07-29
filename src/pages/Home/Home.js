import React from 'react';
import Chat from '../../components/Chat/Chat';
import Loading from '../../components/Loading/Loading';
import Menu from '../../components/Menu/Menu';
import ModalCheckList from '../../components/ModalCheckList/ModalCheckList';
import ModalCreateChannel from '../../components/ModalCreateChannel/ModalCreateChannel';
import ModalForwarding from '../../components/ModalForwarding/ModalForwarding';
import ModalLink from '../../components/ModalLink/ModalLink';
import ModalScheduleMessage from '../../components/ModalScheduleMessage/ModalScheduleMessage';
import { useHome } from '../../hooks/useHome';

import './Home.css';

export default function Home() {
  const { currentChat, usersList, channelsList, setCurrentChat, updateLastConversation } = useHome();

  return (
    <div className="Home">
      <Menu
        usersList={usersList}
        channelsList={channelsList}
        setCurrentChat={setCurrentChat}
        updateLastConversation={updateLastConversation}
      />
      <div className="Home__chat">
        {currentChat ? <Chat currentChat={currentChat} /> : (
          currentChat === "" ? <h1 className="Home__chat__noChat">Bienvenido para comenzar a usar el chat, seleccione una conversación.</h1> : <Loading />
        )}
      </div>
      <div className="Modals">
        <ModalCheckList />
        <ModalCreateChannel usersList={usersList} />
        <ModalForwarding usersList={usersList} channelsList={channelsList} />
        <ModalLink />
        <ModalScheduleMessage />
      </div>
    </div>
  );
}