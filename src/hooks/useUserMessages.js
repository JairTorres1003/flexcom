import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const useUserMessages = ({ user }) => {
  const [usersMessages, setUsersMessages] = useState([]);

  const getUsersMessages = (usersId) => {
    const userRef = collection(db, "users");
    const userQ = query(userRef);
    onSnapshot(userQ, userQuerySnapshot => {
      let usersMsg = [];
      userQuerySnapshot.forEach(userDoc => {
        if (usersId.includes(userDoc.data().uid)) {
          usersMsg.push(userDoc.data());
        }
      });
      setUsersMessages(usersMsg);
    });
  }

  useEffect(() => {
    const Messages = collection(db, "messages");
    const q = query(Messages);
    onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        const u = doc.data();
        if (u.id.includes(user.uid)) {
          const userId = u.id.replace(user.uid, "").replace("+", "");
          users.push(userId);
        }
      });
      getUsersMessages(users);
    });
  }, []);

  return { usersMessages };
}