import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { db } from "../firebase/firebaseConfig";

export const useHome = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useContext(AuthContext);

  const getCurrentChat = async () => {
    let docRef = doc(db, `users/${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().lastActiveConversation !== "") {
        let chatRef = doc(db, `channels/${docSnap.data().lastActiveConversation}`);
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          setCurrentChat(chatSnap.data());
        } else {
          let chat_Ref = doc(db, `users/${docSnap.data().lastActiveConversation}`);
          const chat_Snap = await getDoc(chat_Ref);
          if (chat_Snap.exists()) {
            setCurrentChat(chat_Snap.data());
          } else {
            setCurrentChat("");
          }
        }
      } else {
        setCurrentChat("");
      }
    }
  }

  const updateLastConversation = async (conversation) => {
    let docRef = doc(db, `users/${user.uid}`);
    await updateDoc(docRef, {
      lastActiveConversation: conversation
    });
  }

  useEffect(() => {
    getCurrentChat();
  }, []);

  return {
    currentChat,
    setCurrentChat,
    updateLastConversation
  };
}