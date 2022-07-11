import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebaseConfig";

export const useLogin = () => {
  const [login, setLogin] = useState({
    email: null,
    password: null,
    loading: false
  });

  const navigate = useNavigate();

  const rippleLoginButton = (e) => {
    e.preventDefault();
    const button = document.getElementById("login-button");
    let ripple = document.createElement("span");
    let x = e.clientX - button.offsetLeft;
    let y = e.clientY - button.offsetTop;

    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    button.appendChild(ripple);

    setTimeout(function () {
      ripple.remove();
    }, 700);

    const inputLoginEmail = document.getElementById("input-login-email");
    const inputLoginPassword = document.getElementById("input-login-password");

    if (inputLoginEmail.value === "" && inputLoginPassword.value === "") {
      setLogin({
        ...login,
        email: null,
        password: "El correo electrónico o la contraseña son incorrectos"
      });
    } else {
      if (inputLoginEmail.value === "" || inputLoginEmail.value.indexOf("@inemflex.com") !== -1) {
        setLogin({
          ...login,
          email: "El correo electrónico no es válido",
          password: null
        });
      } else {
        setLogin({ ...login, confirmEmail: null, loading: true });
        try {
          const loginUser = async () => {
            const result = await signInWithEmailAndPassword(
              auth,
              inputLoginEmail.value,
              inputLoginPassword.value
            ).then((result) => {
              const update = async () => {
                await updateDoc(doc(db, "users", result.user.uid), {
                  isOnline: true
                }).then(() => {
                  setLogin({
                    email: null,
                    password: null,
                    loading: false
                  });
                  navigate("/");
                });
              }
              update();
            }).catch(err => {
              setLogin({ ...login, email: null, password: "El correo electrónico o la contraseña son incorrectos", loading: false });
            });
          }
          loginUser();
        } catch (err) {
          setLogin({ ...login, password: err.message, loading: false });
        }
      }
    }
  }

  return [login, rippleLoginButton];
}