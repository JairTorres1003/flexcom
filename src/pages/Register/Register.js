import React, { useState } from "react";
import { IoMailOutline, IoEyeOutline, IoEyeOffOutline, IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

import "./Register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState({
    eye: <IoEyeOutline className="register_iconBtn" />
  });
  const [register, valConfirmEmail, valConfirmPassword, rippleRegisterButton] = useRegister();

  const updateShowPassword = (e) => {
    e.preventDefault();
    const input = document.getElementById("register-password");
    const inputConfirm = document.getElementById("register-confirm-password");
    let icon;
    if (input.type === "password") {
      input.type = "text";
      inputConfirm.type = "text";
      icon = <IoEyeOffOutline className="register_iconBtn" />
    } else {
      input.type = "password";
      inputConfirm.type = "password";
      icon = <IoEyeOutline className="register_iconBtn" />
    }
    setShowPassword(previusState => {
      return {
        ...previusState, eye: icon
      };
    });
  }

  return (
        <div className="register">
          <section className="register__container">
            <div className="register__header">
              <h1>Crea una cuenta</h1>
            </div>
            <form className="register__body">
              <div className="register__body__input">
                <div className="register__body__input_name">
                  <input type="text" placeholder="Nombre completo" className="register__inputs" />
                  <span className="btn"><IoPersonCircleOutline className="register_iconBtn" /></span>
                </div>
                <div className="register__body__input_email">
                  <input type="email" placeholder="Correo electrónico" id="register-email" className="register__inputs" />
                  <span className="btn"><IoMailOutline className="register_iconBtn" /></span>
                </div>
                <div className="register__body__input_email">
                  <input type="email" placeholder="Confirmar correo electrónico" id="register-confirm-email" className="register__inputs" onKeyUp={valConfirmEmail} />
                  <span className="btn"><IoMailOutline className="register_iconBtn" /></span>
                </div>
                {
                  register.confirmEmail ? <span className="message_error_register">{register.confirmEmail}</span> : null
                }
                <div className="register__body__input_password">
                  <input type="password" placeholder="Contraseña" id="register-password" className="register__inputs" />
                  <button className="btn" onClick={updateShowPassword}>
                    {showPassword.eye}
                  </button>
                </div>
                <div className="register__body__input_password">
                  <input type="password" placeholder="Confirmar contraseña" id="register-confirm-password" className="register__inputs" onKeyUp={valConfirmPassword} />
                  <button className="btn" onClick={updateShowPassword}>
                    {showPassword.eye}
                  </button>
                </div>
                {
                  register.confirmPassword ? <span className="message_error_register">{register.confirmPassword}</span> : null
                }
              </div>
              <div className="register__body__button">
                <button className="btn" id="register-button" onClick={rippleRegisterButton}>CREAR CUENTA</button>
                <span className="account">
                  ¿YA TIENES UNA CUENTA?<br />
                  <Link to="/login">INICIA SESIÓN</Link>
                </span>
              </div>
            </form>
          </section>
        </div>
  )
}