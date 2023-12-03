import "../css/SupportEdit.css";
import React, { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';


 
const SupportEdit = () => {
  const navigate = useNavigate();
  const [questions, setQuestion] = useState([]);
  const [kivalasztott, setKivalasztott] = useState();

  const getquestion = (questionID)=>{

    axios.get(`https://webshopnodedeploy.azurewebsites.net/getOneQuestion/${questionID}`)
    .then((response)=>{
      localStorage.setItem('kerdes',JSON.stringify(response.data));
      navigate('/modifyQuestion')
    })
    .catch((error) => {
      console.error("Hiba a kérdés hozzáadásakor: ", error);
    });


  }

  useEffect(()=>{

    axios.get("https://webshopnodedeploy.azurewebsites.net/getAllQuestion")
    .then(response =>{
      setQuestion(response.data.kerdesek);
    })
    .catch(error => {
      console.error("Error fetching questions:", error);
    });
  }, []);

  return (
    <div className="acontainer">
      <form>
      <div className="inputs">
      <div className="aheader">
        <div className="text">Válassz egy kérdést:</div>
        <div className="underline"></div>
      </div>
      <select value={kivalasztott} onChange={(e) => setKivalasztott(e.target.value)}>
        {questions.map((item) => (
            <option value={item.id}>
              {item.kerdes}
            </option>
        ))}
      </select>

      <div className="button-container">
        <Link id="gombocska" to="/AddQuestion">
          <button className="select-btn">Kérdés hozzáadás</button>
        </Link>

        
        <button className="select-btn" onClick={(e) => {
              e.preventDefault(); 
              getquestion(kivalasztott);
            }}>Szerkesztés</button>
      </div>
      </div>
      </form>
    </div>
  );
};

export default SupportEdit;
