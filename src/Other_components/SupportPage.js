import React, { useState, useEffect} from "react";
import "../css/SupportPage.css";
import Footer from "./Footer";
import axios from 'axios';


const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={toggleAnswer}>
      <h3 className="question">{question}</h3>
      {isOpen && (
        <div className="answer-container">
          <p className="answer">{answer}</p>
        </div>
      )}
    </div>
  );
};

const SupportPage = () => {
  const [question, setQuestion] = useState([]);


  useEffect(()=>{

    axios.get("http://localhost:8888/getAllQuestion")
    .then(response =>{
      setQuestion(response.data.kerdesek);
    })
    .catch(error => {
      console.error("Error fetching questions:", error);
    });
  }, []);

  return (
    <div className="support-page">
      <div className="sup-cim">
        <div className="background-container">
          <h1 className="supp-cim">
            <span className="felkialtojel">!</span>
            <span>L</span>opott<span>R</span>uhak{" "}
            <span className="faq">FAQ</span>
          </h1>
        </div>
      </div>
      {question.map((item) => (
      <FaqItem
        question={item.kerdes}
        answer={item.valasz}
      />
      ))}
     
      <Footer />
    </div>
  );
};

export default SupportPage;
