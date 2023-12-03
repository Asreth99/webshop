import React from "react";
import "../css/liked_items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Details from "../Other_components/details";
import { useState } from "react";

function LikedItems({ visibility, products, onLikedRemove, onClose }) {
  const [detailsVisibility, setDetailsVisibility] = useState(false);
  const [detailedItem, setDetailedItem] = useState();

  return (
    <div className="modal" style={{ display: visibility ? "block" : "none" }}>
      <Details
        visibility={detailsVisibility}
        onClose={() => setDetailsVisibility(false)}
        product={detailedItem}
      />
      <div className="liked_items">
        <div className="header">
          <h1>Kedvencek</h1>
          <button className="btn close_btn" onClick={onClose}>
            <p>Close</p>
          </button>
        </div>
        <div className="liked_products">
          {products.length === 0 && (
            <span className="empty_text">Nem Tetszik semmi?????</span>
          )}
          {products.map((product) => (
            <div className="liked_product" key={product.id}>
              <img src={product.thumb} alt={product.product_name} />
              <div className="product_info">
                <h3>{product.product_name}</h3>
                <button
                  onClick={() => {
                    setDetailedItem(product);
                    setDetailsVisibility(true);
                  }}
                >
                  Details
                </button>
              </div>
              <button
                className="vtn remove_btn"
                onClick={() => onLikedRemove(product)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikedItems;
