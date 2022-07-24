/* eslint-disable no-undef */
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";

import "./TitleBar.css";

export default function TitleBar() {
  const [isMaximizeRestore, setIsMaximizeRestore] = useState(false);

  const minimizeButton = () => {
    app.window.minimize();
  }
  const maximizeRestore = () => {
    setIsMaximizeRestore(!isMaximizeRestore);
    app.window.maximize_restore();
  }
  const closeButton = () => {
    app.window.close();
  }

  return (
    <header className="TitleBar">
      <div className="TitleBar__title">
        <FiSend className="TitleBar__title__icon" />
        <p className="TitleBar__title__text">Flexcom</p>
      </div>
      <div className="TitleBar__buttons">
        <button className="TitleBar__buttons__button" id="minimize-button" onClick={minimizeButton}><VscChromeMinimize className="iconBtn" /></button>
        <button className="TitleBar__buttons__button" id="maxi_rest-button" onClick={maximizeRestore}>{
          isMaximizeRestore ? <VscChromeRestore className="iconBtn" /> : <VscChromeMaximize className="iconBtn" />
        }</button>
        <button className="TitleBar__buttons__button" id="close-button" onClick={closeButton}><VscChromeClose className="iconBtn" /></button>
      </div>
    </header>
  );
}