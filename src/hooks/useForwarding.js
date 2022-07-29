import { useState } from "react";

export const useForwarding = () => {
  const [forwardMessage, setForwardMessage] = useState(null);
  const [optionsRecipients, setOptionsRecipients] = useState({
    title: "Seleccione un usuario",
    options: [
      // usersList ? usersList.map(user => {
      //   return {
      //     label: user.name,
      //     value: user.uid
      //   };
      // }) : null
    ]
  });

  const handleChangeRecipients = () => {
    if (optionsRecipients.title === "Seleccione un usuario") {
      setOptionsRecipients({
        title: "Seleccione un canal",
        options: [
          // channelsList ? channelsList.map(channel => {
          //   return {
          //     label: channel.name,
          //     value: channel.id
          //   };
          // }) : null
        ]
      });
    } else {
      setOptionsRecipients({
        title: "Seleccione un usuario",
        options: [
          // usersList ? usersList.map(user => {
          //   return {
          //     label: user.name,
          //     value: user.uid
          //   };
          // }) : null
        ]
      });
    }
  }

  return {
    forwardMessage,
    setForwardMessage,
    optionsRecipients,
    handleChangeRecipients
  }
}