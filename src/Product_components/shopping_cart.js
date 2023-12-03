import React, { useState, useEffect } from "react";
import "../css/shopping_cart.css";
import kepcipo from "../img/nagycipo.png";
import keppolo from "../img/nagypolo.png";
import kepnadrag from "../img/nagygatya.png";
import kepkabat from "../img/hofeherairforce.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import keppulcsi from "../img/nagypulcsi.png";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";

function ShoppingCart({
  visibility,
  onProductRemove,
  onClose,
  onQuantityChange,
}) {
  const user = authService.getCurrentUser();
  const userID = user.id;
  const [cartData, setCartData] = useState([]);
  const [selectedCounts, setSelectedCounts] = useState({});
  const categoryImages = {
    polo: keppolo,
    cipo: kepcipo,
    nadrag: kepnadrag,
    kabat: kepkabat,
    pulcsi: keppulcsi,
  };

  useEffect(() => {
    axios.get("http://localhost:8888/kosar",{params:{userID}})
      .then((response) => {
        setCartData(response.data.kosar);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, [userID]);
  const removeCart = (productId) => {
    axios
      .post(`http://localhost:8888/deleteKosarbol/${productId}`)
      .then((response) => {
        console.log("Termék kitörölve: ", response.data);
        setCartData((prevData) =>
          prevData.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error("Hiba a termék törlésekor: ", error);
      });
  };
  const calculateTotalPrice = (product) => {
    const selectedCount = selectedCounts[product.id] || 1;
    return product.ar * selectedCount;
  };

  const handleQuantityChange = (productId, newCount) => {
    setSelectedCounts((prevCounts) => {
      return { ...prevCounts, [productId]: newCount };
    });
    onQuantityChange(productId, newCount);
  };
  const totalCartPrice = cartData.reduce((osszeg, product) => {
    return osszeg + calculateTotalPrice(product);
  }, 0);

  return (
    <>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
      <div className="modal" style={{ display: visibility ? "block" : "none" }}>
        <div className="shopping_cart">
          <div className="header">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            <button className="btn close_btn" onClick={onClose}>
              <p>Close</p>
            </button>
          </div>
          <div className="cart_products">
            {cartData.length === 0 && (
              <span className="empty_text">
                Üres a kosara. Menjen vásárolni!
              </span>
            )}
            {cartData.map((product) => (
              <div className="cart_product" key={product.id}>
                <img src={categoryImages[product.kategoria]} alt="" />
                <div className="product_info">
                  <h3>{product.termeknev}</h3>
                  <span className="product_price">
                    {calculateTotalPrice(product)} Ft
                  </span>
                </div>
                <select
                  className="count"
                  value={selectedCounts[product.id] || 1}
                  onChange={(event) =>
                    handleQuantityChange(
                      product.id,
                      parseInt(event.target.value, 10)
                    )
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                    <option value={number} key={number}>
                      {number}
                    </option>
                  ))}
                </select>
                <button
                  className="vtn remove_btn"
                  onClick={() => removeCart(product.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
            <div className="osszeg">Összesen: {totalCartPrice} Ft</div>
            {cartData.length > 0 && (
              <Link id="#gombocska" to="/checkout" >
                <button className="btn checkout_btn">Fizetés</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
