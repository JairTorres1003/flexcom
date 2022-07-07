import React from "react";
import { IoMailOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState({
    eye: <IoEyeOutline className="login_iconBtn" />
  });

  const updateShowPassword = () => {
    const input = document.getElementById("input-password");
    let icon;
    if (input.type === "password") {
      input.type = "text";
      icon = <IoEyeOffOutline className="login_iconBtn" />
    } else {
      input.type = "password";
      icon = <IoEyeOutline className="login_iconBtn" />
    }
    setShowPassword(previusState => {
      return {
        ...previusState, eye: icon
      };
    });
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1>Inicio de sesión</h1>
        </div>
        <div className="login__body">
          <div className="login__body__input">
            <div className="login__body__input_email">
              <input type="email" placeholder="Correo electrónico" />
              <span className="btn"><IoMailOutline className="login_iconBtn" /></span>
            </div>
            <div className="login__body__input_password">
              <input type="password" placeholder="Contraseña" id="input-password" />
              <button className="btn" id="showPass-button" onClick={updateShowPassword}>
                {showPassword.eye}
              </button>
            </div>
          </div>
          <div className="login__body__button">
            <button className="btn" id="login-button" onClick={rippleButton}>INICIAR SESIÓN</button>
            <button className="btn">VOLVER</button>
            <span className="no_account">
              ¿NO TIENES CUENTA?&nbsp;
              <a href="">REGÍSTRATE</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/// Efecto al hacer click en el botón de iniciar sesión
function rippleButton(e) {
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
}