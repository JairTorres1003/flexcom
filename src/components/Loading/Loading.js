import React from "react";

import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <h1 className="loading__text">
        Cargando
        <span className="loading__text--dot">.</span>
        <span className="loading__text--dot">.</span>
        <span className="loading__text--dot">.</span>
      </h1>
    </div>
  );
}