import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/Nav.css";
import Nav from "./NavBar/Nav";
import CustomHome from "./Home";
import SupportContent from "./Other_components/SupportPage";
import LoginSignup from "./User_components/LoginSignup";
import ProfileContent from "./User_components/Profile";
import MainContent from "./Product_components/mainContent";
import AdminDelete from "./Admin_components/AdminDelete";
import AdminUpload from "./Admin_components/AdminUpload";
import ModifyProduct from "./Product_components/modifyProduct";
import ModifySupport from "./Other_components/SupportEdit";
import QuestionAdd from "./Other_components/AddQuestion";
import CheckoutPage from "./Other_components/checkout";

function Products() {
  return <MainContent />;
}

function Login() {
  return <LoginSignup />;
}

function SupportEdit() {
  return <SupportEdit />;
}
function AddQuestion() {
  return <AddQuestion />;
}
function Checkout() {
  return <Checkout />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/delete" element={<AdminDelete />} />
          <Route path="/upload" element={<AdminUpload />} />
          <Route path="/" element={<CustomHome />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileContent />} />
          <Route path="/support" element={<SupportContent />} />
          <Route path="/modifyProduct" element={<ModifyProduct />} />
          <Route path="/SupportEdit" element={<ModifySupport />} />
          <Route path="/AddQuestion" element={<QuestionAdd />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
