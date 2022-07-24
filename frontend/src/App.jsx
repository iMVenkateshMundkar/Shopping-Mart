import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Screens
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import SignInScreen from "./Screens/SignInScreen";
import OrdersScreen from "./Screens/OrdersScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import CheckOutScreen from "./Screens/CheckOutScreen";

// Components
import Navbar from "./Components/Navbar";
import BackDrop from "./Components/BackDrop";
import SideDrawer from "./Components/SideDrawer";

function App() {
  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <BackDrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/product/:id" element={<ProductScreen />} />
          <Route exact path="/cart" element={<CartScreen />} />
          <Route exact path="/signin" element={<SignInScreen />} />
          <Route exact path="/order-history" element={<OrdersScreen />} />
          <Route exact path="/signup" element={<SignUpScreen />} />
          <Route exact path="/checkout" element={<CheckOutScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
