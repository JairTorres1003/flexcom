import { useEffect, useState } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useChannel = () => {
  const [listChannels, setListChannels] = useState([]);

  const getChannels = async () => {
    const channelsRef = collection(db, "channels");
    const q = query(channelsRef);
    const unsub = onSnapshot(q, querySnapshot => {
      let channels = [];
      querySnapshot.forEach(doc => {
        channels.push(doc.data());
      });
      setListChannels(channels);
    });
  }

  useEffect(() => {
    getChannels();
  }, []);

  return {listChannels};
}