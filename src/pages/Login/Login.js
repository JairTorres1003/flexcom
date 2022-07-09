import React, { useState } from "react";
import { IoMailOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState({
    eye: <IoEyeOutline className="login_iconBtn" />
  });
  const [login, rippleLoginButton] = useLogin();

  const updateShowPassword = (e) => {
    e.preventDefault();
    const input = document.getElementById("input-login-password");
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
      <section className="login__container">
        <div className="login__header">
          <h1>Inicio de sesión</h1>
        </div>
        <form className="login__body">
          <div className="login__body__input">
            <div className="login__body__input_email">
              <input type="email" placeholder="Correo electrónico" id="input-login-email" />
              <span className="btn"><IoMailOutline className="login_iconBtn" /></span>
            </div>
            {
              login.email ? <span className="message_error_login">{login.email}</span> : null
            }
            <div className="login__body__input_password">
              <input type="password" placeholder="Contraseña" id="input-login-password" />
              <button className="btn" id="showPass-button" onClick={updateShowPassword}>
                {showPassword.eye}
              </button>
            </div>
            {
              login.password ? <span className="message_error_login">{login.password}</span> : null
            }
          </div>
          <div className="login__body__button">
            <button className="btn" id="login-button" onClick={rippleLoginButton}>INICIAR SESIÓN</button>
            <span className="no_account">
              ¿NO TIENES CUENTA?&nbsp;
              <Link to="/register">REGÍSTRATE</Link>
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}