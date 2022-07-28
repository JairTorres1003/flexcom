import { useState } from "react";
import swal from "sweetalert";

export const useScheduleMessage = () => {
  const [scheduleMessage, setScheduleMessage] = useState(null);

  // limita la hora a la fecha actual
  const checkDateTime = () => {
    const today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes() + 5;
    const dateScheduleMessage = document.getElementById("date-scheduleMessage");
    const timeScheduleMessage = document.getElementById("time-scheduleMessage");

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;

    let todayDate = today.getFullYear() + "-" + month + "-" + day;

    if (minute > 59) {
      hour++;
      minute = minute - 59;
    }

    hour = (hour < 10 ? '0' : '') + hour;
    minute = (minute < 10 ? '0' : '') + minute;

    if (dateScheduleMessage.value === todayDate) {
      timeScheduleMessage.min = `${hour}:${minute}`;
      if (timeScheduleMessage.value < `${hour}:${minute}`) {
        timeScheduleMessage.value = `${hour}:${minute}`;
      }
    } else {
      timeScheduleMessage.min = "00:00";
    }

    let dateTime = new Date(dateScheduleMessage.value + "T" + timeScheduleMessage.value);
    dateTime = dateTime.toISOString();
    setScheduleMessage(dateTime);
  }

  const sendScheduleMessage = () => {
    checkDateTime();
    document.getElementById('send-button').click();
    swal({
      title: "Programado",
      text: "Mensaje programado para el " + new Date(scheduleMessage).toLocaleString(),
      icon: "success",
      button: "Aceptar",
    });
    document.getElementById('cancel-scheduleMessage').click();
  }

  return {
    scheduleMessage,
    setScheduleMessage,
    checkDateTime,
    sendScheduleMessage
  }
}
