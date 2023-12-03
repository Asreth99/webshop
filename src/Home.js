import React from "react";
import "./css/Home.css";
import fooldalkep1 from "../src/img/fooldal_kep1.jpg";
import fooldalkep2 from "../src/img/fooldal_kep2.jpg";
import Footer from "./Other_components/Footer";
function Home() {
  return (
    
    <div className="mcontainer">
    <div className="hcontainer">
      <div className="section">
        <div className="image-container left">
          <img className="img" id="fooldalkep1" src={fooldalkep1} alt="logo" />
        </div>
        <div className="text-container">
          <p>Divat az életstílus - Fedezd fel stílusodat nálunk!</p>
        </div>
      </div>
      <div className="section">
        <div className="text-container">
          <p>
            Kifinomult elegancia minden alkalomra - Válassz egyedi ruháinkból!
          </p>
        </div>
        <div className="image-container right">
          <img
            className="img"
            id="fooldalkep2"
            src={fooldalkep2}
            alt="more images"
          />
        </div>
      </div>
      <Footer/>
    </div>
    </div>
  );
}

export default Home;
