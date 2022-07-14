import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import swal from 'sweetalert';

import { auth, db } from "../firebase/firebaseConfig"

export const useRegister = () => {
  const [register, setRegister] = useState({
    confirmEmail: null,
    confirmPassword: null,
    loading: false
  });

  const navigate = useNavigate();

  const valConfirmEmail = (e) => {
    const email = document.getElementById("register-email");
    const confirmEmail = document.getElementById("register-confirm-email");

    if (email.value !== confirmEmail.value && confirmEmail.value !== "") {
      setRegister({ ...register, confirmEmail: "El correo electrónico no coincide" });
    } else {
      setRegister({ ...register, confirmEmail: null });
    }
  }

  const valConfirmPassword = (e) => {
    const password = document.getElementById("register-password");
    const confirmPassword = document.getElementById("register-confirm-password");

    if (password.value !== confirmPassword.value && confirmPassword.value !== "") {
      setRegister({ ...register, confirmPassword: "La contraseña no coincide" });
    } else {
      setRegister({ ...register, confirmPassword: null });
    }
  }

  const rippleRegisterButton = (e) => {
    e.preventDefault();
    const button = document.getElementById("register-button");
    let ripple = document.createElement("span");
    let x = e.clientX - button.offsetLeft;
    let y = e.clientY - button.offsetTop;

    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    button.appendChild(ripple);

    setTimeout(function () {
      ripple.remove();
    }, 700);

    const registerInputs = document.getElementsByClassName("register__inputs");
    let complet = true;
    let dataRegister = {};

    for (let i = 0; i < registerInputs.length; i++) {
      if (registerInputs[i].value === "") {
        setRegister({ ...register, confirmPassword: "Todos los campos son obligatorios" });
        complet = false;
        break;
      }
      dataRegister = {
        name: registerInputs[0].value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase()),
        email: registerInputs[2].value,
        password: registerInputs[4].value,
      }
    }

    if (complet) {
      setRegister({
        ...register,
        confirmPassword: null
      });
      let inputVal = document.getElementById("register-email").value;
      if (inputVal.indexOf("@inemflex.com") !== -1) {
        setRegister({ ...register, confirmEmail: "El correo electrónico no es válido" });
      } else {
        setRegister({ ...register, confirmEmail: null, loading: true });
        try {
          const createUser = async () => {
            // crea el usurio y envia el correo de confirmacion para que pueda activar su cuenta en la plataforma
            const result = await createUserWithEmailAndPassword(
              auth,
              dataRegister.email,
              dataRegister.password
            ).then((result) => {
              // actualiza el displayName del usuario 
              updateProfile(result.user, {
                displayName: dataRegister.name
              });

              sendEmailVerification(result.user).then(() => {
                const docuRef = doc(db, `users/${result.user.uid}`);
                const dataDoc = setDoc(docuRef, {
                  uid: result.user.uid,
                  name: dataRegister.name,
                  email: dataRegister.email,
                  createdAt: Timestamp.fromDate(new Date()),
                  isOnline: false
                });

                swal({
                  title: "¡Bienvenido!",
                  text: "Se ha enviado un correo de confirmación a su cuenta de correo electrónico. Por favor, revise su bandeja de entrada como la carpeta de SPAM.",
                  icon: "success",
                  button: "Aceptar"
                }).then(() => {
                  navigate("/login");
                });

                setRegister({
                  confirmEmail: null,
                  confirmPassword: null,
                  loading: false
                });
              });
            }).catch(err => {
              swal({
                title: "Inicia sesión",
                text: "El correo electrónico ya está registrado",
                icon: "warning",
                button: "Aceptar"
              }).then(() => {
                navigate("/login");
              });
              setRegister({ ...register, loading: false });
            });

            await signOut(auth);
          }
          createUser();
        } catch (err) {
          setRegister({ ...register, confirmPassword: err.message, loading: false });
        }
      }
    }
  }

  return [register, valConfirmEmail, valConfirmPassword, rippleRegisterButton];
}