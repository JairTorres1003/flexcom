import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

export const useCreateChannel = () => {
  const [isCreate, setIsCreate] = useState({
    visibility: 'El canal es visible para todos, cualquier usuario puede unirse.',
  });

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

  const createChannel = () => {
    let name_channel = document.getElementById('name-channel');
    let nameVal = name_channel.value;
    let description_channel = document.getElementById('description-channel');
    let visibility_channel = document.getElementById('visibility-channel');
    let invite_channel = document.getElementById('invite-channel');
    let name_user = document.getElementById('name-user');

    nameVal = valueNameChannel(nameVal);
    name_channel.value = nameVal;

    if (nameVal.length === 0) {
      name_channel.classList.add('--required');
    } else {
      let descriptionVal = description_channel.value;
      if (nameVal.length > 0) {
        name_channel.classList.remove('--required');
      }
      if (descriptionVal.length === 0) {
        descriptionVal = 'Canal de ' + nameVal;
      }
      let members = [name_user.innerHTML];
      let dataChannel = {
        id: new Date().getTime(),
        name: nameVal,
        description: descriptionVal,
        visibility: visibility_channel.checked ? 'private' : 'public',
        members: members,
        admin: name_user.innerHTML,
        created: new Date().toLocaleString()
      }

      const create = async () => {
        await setDoc(doc(db, 'channels/' + nameVal), dataChannel);
      }

      create();

      document.getElementById('button-Message').click();
      setTimeout(() => {
        document.getElementById('button-Channel').click();
      }, 500);
        
      name_channel.value = '';
      description_channel.value = '';
      visibility_channel.checked = false;
      invite_channel.value = '';
      document.getElementById('cancelChannel-btn').click();
    }
  }

  const changeVisibility = () => {
    let visibility_channel = document.getElementById('visibility-channel');
    let msgVisibility = "";
    if (visibility_channel.checked) {
      msgVisibility = 'El canal será privado, solo los usuarios que invites podrán unirse.';
    } else {
      msgVisibility = 'El canal es visible para todos, cualquier usuario puede unirse.';
    }

    setIsCreate(previousState => ({
      ...previousState,
      visibility: msgVisibility
    }));
  }

  return [isCreate, createChannel, KeyUpNameChannel, changeVisibility];
}