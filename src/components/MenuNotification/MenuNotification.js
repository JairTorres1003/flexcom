import React from "react";

import "./MenuNotification.css";

export default function MenuNotification() {
  return (
    <div className="MenuNotification">
      <h2 className="MenuNotification__title">Notificationes</h2>
      <div className="MenuNotification__list">
        {/* ↓ Ejemplo Eliminar despues ↓ */}
        <div className="MenuNotification__list__item">
          <div className="MenuNotification__list__item-title">
            <h4>Titulo</h4>
          </div>
          <div className="MenuNotification__list__item-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quidem.</p>
          </div>
        </div>
        <div className="MenuNotification__list__item">
          <div className="MenuNotification__list__item-title">
            <h4>Titulo</h4>
          </div>
          <div className="MenuNotification__list__item-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quidem.</p>
          </div>
        </div>
        {/* ↑ Ejemplo Eliminar despues ↑ */}
      </div>
      <div className="MenuNotification__button">
        <button className="MenuNotification__button__markAllAsRead" id="button-markAllAsRead">Marcar todas como leidas</button>
      </div>
    </div>
  );
}

window.addEventListener('click', function (e) {
  const btnMarkAllAsRead = document.getElementById('button-markAllAsRead');
  const notifyListItem = document.getElementsByClassName('MenuNotification__list__item');

  if (e.target === btnMarkAllAsRead) {
    for (let i = 0; i < notifyListItem.length; i++) {
      notifyListItem[i].classList.add('--read');
    }
  }

  if (e.target.classList.contains('NotificationMenu__list__item')) {
    e.target.classList.add('--read');
  }
});