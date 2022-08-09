import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import Orders from "./Pages/Orders";
import SignUpPage from "./Pages/SignUpPage";
import CheckOutPage from "./Pages/CheckOutPage";
import UserProfilePage from "./Pages/UserProfilePage";

// Components
import Navbar from "./Components/Navbar";
import BackDrop from "./Components/BackDrop";
import SideDrawer from "./Components/SideDrawer";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <BackDrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/user/:id" element={<UserProfilePage />} />
          {/* <Route
            exact
            path="/forgotpassword"
            element={<ForgotPasswordPage />}
          /> */}
          <Route exact path="/order-history" element={<Orders />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/checkout" element={<CheckOutPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
