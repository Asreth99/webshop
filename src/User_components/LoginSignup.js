import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../css/LoginSignup.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

import user_icon from "../img/person.png";
import email_icon from "../img/email.png";
import password_icon from "../img/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const role = "ROLE_USER";
  const navigate = useNavigate();

  const handleRegister = () => {
  
    axios.post("http://localhost:8888/registerUser", { email, password, role }) 
      .then((response) => {
        setShowSignUpPopup(true);
      });
  };

  const handleLogin = () => {
    axios.post("http://localhost:8888/loginuser", { email, password}) 
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/");
          window.location.reload();
        } else {
          console.log("Sikertelen!");
          setShowPopup(true);
        }

        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <div className="login-container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <form>
          <div className="inputs">
            {action === "Sign Up" ? (
              <div className="input">
                <img className="icon" src={user_icon} alt="" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            ) : null}
            <div className="input">
              <img className="icon" src={email_icon} alt="" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img className="icon" src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {action === "Login" ? (
              <div className="forgot-password">
                Na mi jelszó??? <span>Katt a helpért:D</span>
              </div>
            ) : null}
            <div className="submit-container">
              <div
                className={action === "Login" ? "submit gray" : "submit"}
                onClick={() => {
                  setAction("Sign Up");
                  if (
                    email.length !== 0 &&
                    password.length !== 0 &&
                    name.length !== 0
                  ) {
                    handleRegister();
                  } else {
                    console.log("EMPTY!!");
                  }
                }}
              >
                Signup
              </div>

              <div
                className={action === "Sign Up" ? "submit gray" : "submit"}
                onClick={() => {
                  setAction("Login");

                  if (email.length !== 0 && password.length !== 0) {
                    handleLogin();
                  } else {
                    console.log("EMPTY!!");
                  }
                }}
              >
                Login
              </div>
              <Popup
                open={showPopup}
                closeOnDocumentClick
                onClose={() => setShowPopup(false)}
                contentStyle={{
                  width: "400px",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="popup_text">Sikertelen Bejelentkezés!</div>
                <button
                  className="popupButton"
                  onClick={() => {
                    setShowPopup(false);
                  }}
                >
                  Close
                </button>
              </Popup>

              <Popup
                open={showSignUpPopup}
                closeOnDocumentClick
                onClose={() => setShowSignUpPopup(false)}
                contentStyle={{
                  width: "400px",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="popup_text">Ez az email már foglalt.</div>
                <button
                  className="popupButton"
                  onClick={() => {
                    setShowSignUpPopup(false);
                  }}
                >
                  Close
                </button>
              </Popup>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginSignup;
