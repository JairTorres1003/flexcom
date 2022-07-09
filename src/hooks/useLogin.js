import { useState } from 'react';

export const useLogin = () => {
  const [login, setLogin] = useState({
    email: null,
    password: null
  });

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
      if (inputLoginEmail.value === "" || inputLoginEmail.value.indexOf("@inemflex.com") === -1) {
        setLogin({
          ...login,
          email: "El correo electrónico no es válido",
          password: null
        });
      } else {
        if (inputLoginEmail.value !== "test@inemflex.com") {
          setLogin({
            ...login,
            email: "El correo electrónico no está registrado",
            password: null
          });
        } else {
          if (inputLoginEmail.value === "test@inemflex.com" && inputLoginPassword.value !== "123456") {
            setLogin({
              ...login,
              email: null,
              password: "La contraseña es incorrecta"
            });
          } else {
            setLogin({
              ...login,
              email: null,
              password: null
            });
            console.log("Login correcto");
          }
        }
      }
    }
  }

  return [login, rippleLoginButton];
}