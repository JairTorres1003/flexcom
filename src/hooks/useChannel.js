import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useChannel = () => {
  const [listChannels, setListChannels] = useState([]);

  const getChannels = async () => {
    const channels = [];
    const collectionRef = collection(db, "channels");
    const docs = await getDocs(collectionRef);

    docs.forEach((doc) => {
      channels.push(doc.data());
    });

    setListChannels(channels);
  }


  useEffect(() => {
    getChannels();
  }, []);

  return [listChannels];
}