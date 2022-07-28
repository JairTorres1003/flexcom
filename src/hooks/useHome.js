import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
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

  const chronometerProgrammed = async () => {
    let dataSchedules = [];
    let docRef = collection(db, 'schedules');
    let q = query(docRef, orderBy("createdAt", "asc"));
    onSnapshot(q, querySnapshot => {
      let schedules = [];
      querySnapshot.forEach(doc => {
        schedules.push(doc.data());
      });
      dataSchedules = schedules;
    });

    setInterval(async () => {
      console.log("Cronometro", dataSchedules);
      let dRef = null;
      if (dataSchedules.length > 0) {
        let chatId = dataSchedules[0].chatId;
        let id = dataSchedules[0].id;
        if (dataSchedules[0].createdAt.toDate() < new Date()) {
          if (dataSchedules[0].type === "message") {
            dRef = doc(db, `messages/${chatId}/chat/${id}`);
          } else {
            let idMsg = dataSchedules[0].idMsg;
            dRef = doc(db, `messages/${chatId}/chat/${idMsg}/reply/${id}`);
          }
          await updateDoc(dRef, {
            programmed: false
          });
          await deleteDoc(doc(db, `schedules/${id}`));
        }
        console.log(dataSchedules);
      }
    }, 60000);
  }

  useEffect(() => {
    getCurrentChat();
    chronometerProgrammed();
  }, []);

  return {
    currentChat,
    setCurrentChat,
    updateLastConversation
  };
}