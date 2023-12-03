import React from "react";
import { useState } from "react";
import axios from "axios";
import "../css/AdminUpload.css";

const AdminUpload = () => {
  const [name, setName] = useState();
//  const [picture, setPicture] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();

  const handleTermek = () => {
    axios.post("https://webshopnodedeploy.azurewebsites.net/addTermek", { name, price, description,category }) 
      .then((response) => {
        console.log("SIKER");
        console.log(response.data);
      })
      .catch((error) => {
        console.log("ERRRRROR");
        console.error(error);
      });
  };

  return (
    <><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /><div className="xdcontainer">
      <div className="acontainer">
        <div className="aheader">
          <div className="text">Töltsön fel egy terméket!</div>
          <div className="underline"></div>
        </div>
        <form>
          <div className="inputs">
            <label>Termék Neve</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label>Termék Ára</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)} />
            <label>Termék Leírása</label>
            <input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            <label>Termék Kategóriája</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="polo">Póló</option>
              <option value="cipo">Cipő</option>
              <option value="nadrag">Nadrág</option>
              <option value="kabat">Kabát</option>
              <option value="pulcsi">Pulcsi</option>
            </select>
            <div className="button-container">
              <button onClick={handleTermek}>Termék feltöltése</button>

            </div>

          </div>
        </form>
      </div>
    </div></>
  );
};

export default AdminUpload;
