import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { db } from "../firebase/firebaseConfig";

export const useHome = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [channelsList, setChannelsList] = useState([]);
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

  const getUsers = () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("name"));
    onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        if (doc.data().uid !== user.uid) {
          users.push(doc.data());
        }
      });
      setUsersList(users);
    });
  }

  const getChannels = async () => {
    const channelsRef = collection(db, "channels");
    const q = query(channelsRef);
    onSnapshot(q, querySnapshot => {
      let channels = [];
      querySnapshot.forEach(doc => {
        if (doc.data().visibility === "public") {
          channels.push(doc.data());
        } else {
          if (doc.data().members.includes(user.uid)) {
            channels.push(doc.data());
          }
        }
      });
      setChannelsList(channels);
    });
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
      }
    }, 60000);
  }

  useEffect(() => {
    getCurrentChat();
    getUsers();
    getChannels();
    chronometerProgrammed();
  }, []);

  return {
    currentChat,
    setCurrentChat,
    usersList,
    channelsList,
    updateLastConversation
  };
}