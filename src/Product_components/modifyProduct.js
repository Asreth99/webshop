import React, { useState } from 'react';
import "../css/Profile.css";
import authService from "../services/auth.service";
import axios from "axios";

function ModifyProduct() {
  const product = authService.getChosenProduct();
  const [name, setName] = useState(product.termeknev || '');
  const [price, setPrice] = useState(product.ar || '');
  const [description, setDescription] = useState(product.leiras || '');
  const [category, setCategory] = useState(product.kategoria || '');

  const handleModify = (id) => {
    axios.post(`https://webshopnodedeploy.azurewebsites.net/modifyProduct/${id}`, { name, price, description, category })
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
          <div className="text">Termék Módosítása</div>
          <div className="underline"></div>
        </div>
        <form>
          <div className="inputs">
            <label>Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label>Product Price</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)} />
            <label>Product Description</label>
            <input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
            <label>Product Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="polo">Póló</option>
              <option value="cipo">Cipő</option>
              <option value="nadrag">Nadrág</option>
              <option value="kabat">Kabát</option>
            </select>
            <div className="button-container">
              <a href='/products' className="login-btn" onClick={() => {
                handleModify(product.id);

                window.location.reload();
              } }>Módosítás</a>
            </div>
          </div>
        </form>
      </div>
    </div></>
  );
}

export default ModifyProduct;
