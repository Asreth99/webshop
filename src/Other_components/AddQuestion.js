import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/SupportEdit.css";

const AddQuestion = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const addQuestion = () =>{
    axios.post("http://localhost:8888/addQuestion",{question,answer})
    .then((response)=>{
      console.log("Question Added")
    })
    .catch((error) => {
      console.error("Error while adding a question: ", error);
    });
  }
  return (
    <div className="acontainer">
      <form>
      <div className="inputs">
      <div className="aheader">
        <div className="text">Adj hozzá egy kérdést:</div>
        <div className="underline"></div>
      </div>
      <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)} />
      <div className="aheader">
        <div className="text">Adj hozzá egy választ:</div>
        <div className="underline"></div>
      </div>
      <input
              type="text"
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)} />
      <div className="button-container">
        <button className="select-btn" onClick={()=>{
          if(question.length !==0 && answer.length !==0){
            addQuestion()
          }else{
            console.log("Empty Field");
          }
        }}>Kérdés hozzáadás</button>
        <Link id="gombocska" to="/SupportEdit">
          <button className="select-btn">Szerkesztés</button>
        </Link>
      </div>
      </div>
      </form>
    </div>
  );
};

export default AddQuestion;
