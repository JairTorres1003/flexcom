import { useContext, useState } from 'react';
import { collection, doc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AuthContext } from '../context/authProvider';
import swal from 'sweetalert';

export const useCreateChannel = () => {
  const [isCreate, setIsCreate] = useState({
    visibility: false,
    loading: false
  });
  const { user } = useContext(AuthContext);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const KeyUpNameChannel = (e) => {
    let name_channel = document.getElementById('name-channel');
    let nameVal = name_channel.value;
    if (nameVal.length > 0) {
      nameVal = nameVal.replace(/\s/g, '-');
      nameVal = nameVal.replace(/[^a-zA-Z0-9-]/g, '');
      name_channel.value = nameVal;
    }
    if (e.keyCode === 13) {
      name_channel.value = valueNameChannel(nameVal);
    }
  }

  const valueNameChannel = (nameVal) => {
    let nameArray = nameVal.split('-');
    nameArray = nameArray.filter(function (e) {
      return e.length > 0;
    });
    nameVal = nameArray.join('-');
    return nameVal;
  }

  const createChannel = async () => {
    let name_channel = document.getElementById('name-channel');
    let nameVal = name_channel.value;
    let description_channel = document.getElementById('description-channel');
    let visibility_channel = document.getElementById('visibility-channel');
    let modalContentInvite = document.getElementsByClassName('ModalCreateChannel__modal__content__invite')[0];
    let searchInvited = document.getElementById('search-invited');

    nameVal = valueNameChannel(nameVal);
    nameVal = nameVal.toLowerCase();
    name_channel.value = nameVal;

    if (nameVal.length === 0) {
      name_channel.classList.add('--required');
    } else {
      let descriptionVal = description_channel.value;
      let members = [];

      if (nameVal.length > 0) {
        name_channel.classList.remove('--required');
      }

      if (descriptionVal.length === 0) {
        descriptionVal = 'Canal de ' + nameVal;
      }

      const q = query(collection(db, 'channels'), where('name', '==', nameVal));
      const qSnap = await getDocs(q);
      if (qSnap.docs.length > 0) {
        swal({
          title: "El nombre del canal ya existe",
          text: "Por favor, ingrese un nombre diferente",
          icon: "error",
          button: "Aceptar"
        });
        return;
      } else {
        setIsCreate({
          ...isCreate,
          loading: true
        });

        if (visibility_channel.checked === false) {
          const querySnapshot = await getDocs(collection(db, 'users'));
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.id);
          });
          members = users;
        } else {
          let users = [user.uid];
          selectedOptions.forEach((option) => {
            users.push(option.value);
          });
          members = users;
        }

        let dataChannel = {
          id: nameVal + new Date().getTime() + (visibility_channel.checked ? 'private' : 'public'),
          name: nameVal,
          description: descriptionVal,
          visibility: visibility_channel.checked ? 'private' : 'public',
          members: members,
          admin: user.uid,
          createdAt: Timestamp.fromDate(new Date())
        }

        await setDoc(doc(db, 'channels/' + dataChannel.id), dataChannel);

        let id = "msg" + new Date().getTime();
        await setDoc(doc(db, 'messages', dataChannel.id, 'chat', id), {
          nameFrom: user.displayName,
          from: user.uid,
          to: dataChannel.id,
          createdAt: Timestamp.fromDate(new Date()),
          id: id
        });

        await setDoc(doc(db, 'messages/' + dataChannel.id), {
          id: dataChannel.id
        });

        name_channel.value = '';
        description_channel.value = '';
        visibility_channel.checked = false;
        modalContentInvite.classList.add('--public');
        searchInvited.value = '';
        setIsCreate({
          ...isCreate,
          loading: false
        });
        document.getElementById('cancelChannel-btn').click();
      }
    }
  }

  const changeVisibility = () => {
    setIsCreate({
      ...isCreate,
      visibility: !isCreate.visibility
    });
    setSelectedOptions([]);
  }

  return {
    isCreate,
    setIsCreate,
    createChannel,
    KeyUpNameChannel,
    changeVisibility,
    selectedOptions,
    setSelectedOptions
  };
}