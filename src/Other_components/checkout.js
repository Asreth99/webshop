import React from "react";
import "../css/checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";

const Checkout = () => {
  const user = authService.getCurrentUser();
  const userID = user.id;
  const [orszag, setOrszag] = useState();
  const [varos, setVaros] = useState();
  const [iranyitoszam, setIranyitoszam] = useState();
  const [utca_hazszam, setUtca] = useState("");
  const [fizetesi_mod, setFiz1] = useState("Készpénz");
  const [szallitasi_mod, setFiz2] = useState("Pickup");

  const navigate = useNavigate();

  /*TODO a navigate fog majd elirányítani a visszaigazolós oldalra*/
  const handleCheckout = async () => {
    try {
      await axios.post(`http://localhost:8888/clearCart/${userID}`).then((response) => {
        console.log("Termékek kitörölve: ", response.data);
      })

      await axios.post("http://localhost:8888/submitRendeles", {
        orszag, varos, iranyitoszam, utca_hazszam, fizetesi_mod, szallitasi_mod, userID
      });

      // Rendelés leadása után a kosár ürítése
      

      // Itt folytathatod a további lépéseket, ha szükséges

      // Például visszairányítás a visszaigazoló oldalra
      navigate('/products');
    } catch (error) {
      console.error("Hiba a rendelés leadása során: ", error);
    }
  };

  

  return (
    <div className="xdcontainer">
      <div className="acontainer">
        <form>
          <div className="inputs">
            <div className="aheader">
              <div className="text">Fizetés</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              <label className="rendeles-lbl">Ország</label>
              <input
                type="text"
                required
                value={orszag}
                onChange={(e) => setOrszag(e.target.value)}
              />
              <label className="rendeles-lbl">Város</label>
              <input
                type="text"
                required
                value={varos}
                onChange={(e) => setVaros(e.target.value)}
              />
              <label className="rendeles-lbl">Irányítószám</label>
              <input
                type="text"
                required
                value={iranyitoszam}
                onChange={(e) => setIranyitoszam(e.target.value)}
              />
              <label className="rendeles-lbl">Utca, házszám</label>
              <input
                type="text"
                required
                value={utca_hazszam}
                onChange={(e) => setUtca(e.target.value)}
              />
              <label className="rendeles-lbl">Válasszon fizetési és szállítási módot</label>
              <select>
                {" "}
                value={fizetesi_mod} onChange={(e) => setFiz1(e.target.value)}
                <option value="Készpénz">Készpénz</option>
                <option value="Bankkártya">Bankkártya</option>
              </select>
              <br />
              <select value={szallitasi_mod} onChange={(e) => setFiz2(e.target.value)}>
                <option value="Pickup">Pickup</option>
                <option value="Postai szállítás">Postai szállítás</option>
              </select>
              <div className="button-container" >
                <button onClick={(e) => { 
                  e.preventDefault();
                  handleCheckout();
                }}>Rendelés leadása</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
