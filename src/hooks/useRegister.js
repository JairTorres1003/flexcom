import { useState } from 'react';

export const useRegister = () => {
  const [register, setRegister] = useState({
    confirmEmail: null,
    confirmPassword: null,
  });

  const valConfirmEmail = (e) => {
    const email = document.getElementById("register-email");
    const confirmEmail = document.getElementById("register-confirm-email");

    if (email.value !== confirmEmail.value && confirmEmail.value !== "") {
      setRegister({
        ...register,
        confirmEmail: "El correo electrónico no coincide"
      });
    } else {
      setRegister({
        ...register,
        confirmEmail: null
      });
    }
  }

  const valConfirmPassword = (e) => {
    const password = document.getElementById("register-password");
    const confirmPassword = document.getElementById("register-confirm-password");

    if (password.value !== confirmPassword.value && confirmPassword.value !== "") {
      setRegister({
        ...register,
        confirmPassword: "La contraseña no coincide"
      });
    } else {
      setRegister({
        ...register,
        confirmPassword: null
      });
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
        setRegister({
          ...register,
          confirmPassword: "Todos los campos son obligatorios"
        });
        complet = false;
        break;
      }
      dataRegister = {
        name: registerInputs[0].value,
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
      if (inputVal.indexOf("@inemflex.com") === -1) {
        setRegister({
          ...register,
          confirmEmail: "El correo electrónico no es válido"
        });
      } else {
        setRegister({
          ...register,
          confirmEmail: null
        });
        console.log(dataRegister);
      }
    }
  }

  return [register, valConfirmEmail, valConfirmPassword, rippleRegisterButton];
}