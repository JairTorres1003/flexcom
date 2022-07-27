import { useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { AuthContext } from '../context/authProvider';
import swal from 'sweetalert';

export const useCreateChannel = () => {
  const [isCreate, setIsCreate] = useState({
    visibility: 'El canal es visible para todos, cualquier usuario puede unirse.',
    loading: false
  });
  const { user } = useContext(AuthContext);
  const [invitedList, setInvitedList] = useState([]);
  const [listUsers, setListUsers] = useState([]);

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
          members = users;
          for (let i = 0; i < invitedList.length; i++) {
            members.push(invitedList[i].uid);
          }
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
        setInvitedList([]);
        setIsCreate({
          ...isCreate,
          loading: false
        });
        document.getElementById('cancelChannel-btn').click();
      }
    }
  }

  const changeVisibility = () => {
    let visibility_channel = document.getElementById('visibility-channel');
    let modalContentInvite = document.getElementsByClassName('ModalCreateChannel__modal__content__invite')[0];
    let msgVisibility = "";

    if (visibility_channel.checked) {
      msgVisibility = 'El canal será privado, solo los usuarios que invites podrán unirse.';
      modalContentInvite.classList.remove('--public');
    } else {
      msgVisibility = 'El canal es visible para todos, cualquier usuario puede unirse.';
      modalContentInvite.classList.add('--public');
    }

    setIsCreate(previousState => ({
      ...previousState,
      visibility: msgVisibility
    }));
  }

  const activeFocusInvited = () => {
    const searchInvited = document.getElementById('search-invited');
    const PanelUsers = document.getElementsByClassName('PanelUsers')[0];
    let valInvite = searchInvited.value.trim().toLowerCase();

    searchInvited.focus();
    PanelUsers.scrollTop = PanelUsers.scrollHeight;

    if (valInvite.length > 0 && valInvite.indexOf('@') === 0) {
      PanelUsers.classList.add('--searchActive');
    }
  }

  const addNewInvited = (e) => {
    let valInvite = e.target.value.trim().toLowerCase();
    const PanelUsersListItem = document.querySelectorAll('.PanelUsers__list__item');
    const PanelUsers = document.getElementsByClassName('PanelUsers')[0];
    let countFilter = 0;

    if (valInvite.length > 0 && valInvite.indexOf('@') === 0) {
      valInvite = '@' + valInvite.replace(/@/g, '');
      e.target.value = valInvite;

      let search = valInvite.substring(1);
      PanelUsers.classList.add('--searchActive');
      document.getElementById('no-users').classList.remove('--noUsers');

      if (e.keyCode === 13) {
        document.getElementsByClassName('--show')[0].click();
        e.target.value = '';
        search = '';
        activeFocusInvited();
        PanelUsers.classList.remove('--searchActive');
      }

      PanelUsersListItem.forEach((item) => {
        if (item.textContent.toLowerCase().includes(search)) {
          item.classList.remove('--filter');
          item.classList.add('--show');
        } else {
          item.classList.add('--filter');
          item.classList.remove('--show');
          countFilter++;
          if (countFilter === PanelUsersListItem.length) {
            document.getElementById('no-users').classList.add('--noUsers');
          } else {
            document.getElementById('no-users').classList.remove('--noUsers');
          }
        }
      });
    } else {
      PanelUsers.classList.remove('--searchActive');
      PanelUsersListItem.forEach((item) => {
        item.classList.remove('--filter');
        item.classList.remove('--show');
      });
    }
  }

  const removeInvited = (userData) => {
    invitedList.splice(invitedList.indexOf(userData), 1);
    let visibility_channel = document.getElementById('visibility-channel');
    visibility_channel.click();
    visibility_channel.click();
  }

  const getUsers = async () => {
    const colRef = collection(db, "users");
    const q = query(colRef, orderBy('name'));
    onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        if (doc.data().uid !== auth.currentUser.uid) {
          users.push(doc.data());
        }
      });
      setListUsers(users);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return {
    isCreate,
    setIsCreate,
    createChannel,
    KeyUpNameChannel,
    changeVisibility,
    activeFocusInvited,
    addNewInvited,
    setInvitedList,
    invitedList,
    removeInvited,
    listUsers
  };
}