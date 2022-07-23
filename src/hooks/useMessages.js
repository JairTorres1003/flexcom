import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { db } from "../firebase/firebaseConfig";

export const useMessages = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [msgReplys, setMsgReplys] = useState([]);
  const { user } = useContext(AuthContext);

  const getMessages = async () => {
    let userOne = user.uid;
    let userTwo = 0;
    let chatId = 0;

    if (currentChat) {
      if (currentChat.hasOwnProperty('visibility')) {
        chatId = currentChat.id;
        userTwo = currentChat.id;
      } else {
        userTwo = currentChat.uid;
        if (userOne !== userTwo) {
          chatId = userOne > userTwo ? `${userOne}+${userTwo}` : `${userTwo}+${userOne}`
        } else {
          chatId = userOne;
        }
      }
      const msgRef = collection(db, "messages", chatId, "chat");
      const q = query(msgRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMessages(msgs);
      });
    }
  }

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const getMsgReplys = async (msgReply) => {
    let userOne = user.uid;
    let userTwo = 0;
    let chatId = 0;

    if (currentChat) {
      if (currentChat.hasOwnProperty('visibility')) {
        chatId = currentChat.id;
        userTwo = currentChat.id;
      } else {
        userTwo = currentChat.uid;
        if (userOne !== userTwo) {
          chatId = userOne > userTwo ? `${userOne}+${userTwo}` : `${userTwo}+${userOne}`
        } else {
          chatId = userOne;
        }
      }

      if (msgReply) {
        const msgRef = collection(db, "messages", chatId, "chat", msgReply, "reply");
        const q = query(msgRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
          let msgs = [];
          querySnapshot.forEach((doc) => {
            msgs.push(doc.data());
          });
          setMsgReplys(msgs);
        });
      }
    }
  }

  return { messages, msgReplys, getMsgReplys };
}
