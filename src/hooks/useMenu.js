import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";

export const useMenu = () => {
    const [menu, setMenu] = useState(null);
    const navigate = useNavigate();
  
    const openMenu = (btn) => {
      let menuCotent = document.getElementById("menu-content");
      let buttons = document.getElementsByClassName("Menu__Buttons__options__list__item__button");
      let MenuContentPanels = document.getElementsByClassName("Menu__Content__panels")[0];
      let ChatReplyButton = document.getElementsByClassName("Chat__reply__button")[0];
  
      if (ChatReplyButton) {
        ChatReplyButton.click();
      }
  
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("_active");
        MenuContentPanels.children[i].classList.add("_panels");
      }
      buttons[btn].classList.add("_active");
      menuCotent.classList.add("_MenuView");
      MenuContentPanels.children[btn].classList.remove("_panels");
    }
  
    const closeMenu = () => {
      let menuCotent = document.getElementById("menu-content");
      let buttons = document.getElementsByClassName("Menu__Buttons__options__list__item__button");
      let MenuContentPanels = document.getElementsByClassName("Menu__Content__panels")[0];
  
      menuCotent.classList.remove("_MenuView");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("_active");
        MenuContentPanels.children[i].classList.add("_panels");
      }
    }
  
    const openAccount = () => {
      let account = document.getElementById("account-panel");
      let accountWarning = document.getElementById("account-warning");
      if (account.classList.contains("_view")) {
        account.classList.remove("_view");
        if (accountWarning) { accountWarning.classList.add("_view"); }
      } else {
        account.classList.add("_view");
        if (accountWarning) { accountWarning.classList.remove("_view"); }
      }
    }
  
    const signOutUser = async () => {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        isOnline: false
      });
      await signOut(auth);
      navigate('/login');
    }
  
    return [
      menu,
      openMenu,
      closeMenu,
      openAccount,
      signOutUser
    ];
  }