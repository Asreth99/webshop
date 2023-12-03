import React, { useState } from 'react';
import "../css/Profile.css";
import authService from "../services/auth.service";
import axios from "axios";

function ModifyProduct() {
  const chosenQuestion = authService.getChosenQuestion();
  const [question, setQuestion] = useState(chosenQuestion.kerdes || '');
  const [answer, setAnswer] = useState(chosenQuestion.valasz || '');
  
  const handleModify = (id) => {
    axios.post(`http://localhost:8888/modifyQuestion/${id}`, { question,answer })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Error modifying product:", error);
  });
  };

  return (
    <><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /><div className="xdcontainer">
      <div className="acontainer">
        <div className="aheader">
          <div className="text">Kérdés Módosítása</div>
          <div className="underline"></div>
        </div>
        <form>
          <div className="inputs">
            <label>Kérdés</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)} />
            <label>Válasz</label>
            <input
              type="text"
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)} />
            
            <div className="button-container">
              <a href='/support' className="login-btn" onClick={() => {
                handleModify(chosenQuestion.id);
              } }>Módosítás</a>
            </div>
          </div>
        </form>
      </div>
    </div></>
  );
}

export default ModifyProduct;
