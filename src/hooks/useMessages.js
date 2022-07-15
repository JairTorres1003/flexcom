import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { db } from "../firebase/firebaseConfig";

export const useMessages = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  const getMessages = async () => {
    let userOne = 0;
    let userTwo = 0;
    let chatId = 0;

    if (currentChat) {
      if (currentChat.hasOwnProperty('visibility')) {
        chatId = currentChat.id;
      } else {
        userOne = user.uid;
        userTwo = currentChat.uid;
        chatId = userOne > userTwo ? `${userOne}+${userTwo}` : `${userTwo}+${userOne}`
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

  return { messages };
}
