import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";
import AuthProvider from "./context/authProvider";
import PrivateRoute from "./context/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TitleBar from "./pages/TitleBar/TitleBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <TitleBar />
          <main className="App__body">
            <Routes>
              <Route path="/" element={<PrivateRoute component={Home} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
