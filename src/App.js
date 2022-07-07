import React from "react";

import "./App.css";
import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import TitleBar from "./pages/TitleBar/TitleBar";

function App() {
  return (
    <div className="App">
      {/* <TitleBar /> */}
      <main className="App__body">
        {/* <Login /> */}
        <Home />
      </main>
    </div>
  );
}

export default App;
