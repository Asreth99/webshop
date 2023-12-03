import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import kepcipo from "../img/nagycipo.png";
import keppolo from "../img/nagypolo.png";
import kepnadrag from "../img/nagygatya.png";
import keppulcsi from "../img/nagypulcsi.png";
import kepkabat from "../img/hofeherairforce.png";
import "../css/mainContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "../Product_components/shopping_cart";
import Details from "../Other_components/details";
import Footer from "../Other_components/Footer";
import authService from "../services/auth.service";
function MainContent() {
  const categoryImages = {
    polo: keppolo,
    cipo: kepcipo,
    nadrag: kepnadrag,
    kabat: kepkabat,
    pulcsi: keppulcsi
  };

  const [products, setProducts] = useState([]);
  const [, setCartData] = useState([]);
  const [cartVisibility, setCartVisibility] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  const navigate = useNavigate(); 

  const user = authService.getCurrentUser();
  const userID = user.id;

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get("https://webshopnodedeploy.azurewebsites.net/termekek")
      .then(response => {
        setProducts(response.data.termekek);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const getProduct = (productId) =>{

    axios.get(`https://webshopnodedeploy.azurewebsites.net/getOneTermek/${productId}`)
    .then((response) => {
      console.log("Get Product Responded!");
      localStorage.setItem("product",JSON.stringify(response.data));
      navigate('/modifyProduct');
    })
    .catch((error) => {
      console.error("Hiba a termék hozzáadásakor: ", error);
    });
  }

  const addToKosar = (productId) => {
    
    axios.post("https://webshopnodedeploy.azurewebsites.net/addToKart",{productId, userID})
      .then((response) => {
        console.log("Termék hozzáadva a kosárhoz: ", response.data);
        setCartData(response.data.kosar);
        
        
      })
      .catch((error) => {
        console.error("Hiba a termék hozzáadásakor: ", error);
      });
  };
  const handleSearch = () => {
    axios.get(`https://webshopnodedeploy.azurewebsites.net/keres?kategoria=${selectedCategory}`)
      .then(response => {
        setProducts(response.data.termekek);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };
  const onQuantityChange = (produductId, count) => {
    setProductsInCart((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === produductId
      );
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };
  const onProductRemove = (product) => {
    setProductsInCart((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };
  const [detailedItem, setDetailedItem] = useState();
  const [detailsVisibility, setDetailsVisibility] = useState(false); 

  return (
    <><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /><div className="mcontainer">
      <ShoppingCart
        visibility={cartVisibility}
        products={productsInCart}
        onClose={() => setCartVisibility(false)}
        onQuantityChange={onQuantityChange}
        onProductRemove={onProductRemove} />
      <FontAwesomeIcon
        icon={faShoppingCart}
        className="icon"
        style={{ cursor: "pointer" }}
        size="2x"
        onClick={() => setCartVisibility(true)} />
      <Details
        visibility={detailsVisibility}
        onClose={() => setDetailsVisibility(false)}
        product={detailedItem} />

      <h1>Kategória Kereső</h1>
      <form>
        <label for="kategoria"></label>
        <select
          name="kategoria"
          id="kategoria"
          className="kereso-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Minden Termék</option>
          <option value="polo">Póló</option>
          <option value="cipo">Cipő</option>
          <option value="nadrag">Nadrág</option>
          <option value="kabat">Kabát</option>
          <option value="pulcsi">pulcsi</option>
        </select>
      </form>
      <button id="kereso" type="button" onClick={handleSearch}>Keresés</button>
      <div className="main_content">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <div className="card_img">
              <img src={categoryImages[item.kategoria]} alt="" />
            </div>
            <div className="card_header">
              <h2>{item.termeknev}</h2>
              <p>{item.leiras}</p>
              <p className="price">
                {item.ar} <span className="span">Ft</span>
              </p>
              <div
                className="btn"
                onClick={() => {
                 
                  setDetailedItem(item);
                  setDetailsVisibility(true);
                } }
              >
                Leírás
              </div>
              <div className="btn" onClick={() => {
                addToKosar(item.id);
                window.location.reload();
              } }>Kosárhoz ad</div>

              {user && user.role === "ROLE_ADMIN" && (
                <div
                  className="btn" onClick={() => {

                    getProduct(item.id);

                  } }>
                  Módosítás
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div></>


);
}

export default MainContent;
