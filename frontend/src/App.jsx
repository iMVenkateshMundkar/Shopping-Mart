import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import CartPage from "./Pages/CartPage/CartPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import CheckOutPage from "./Pages/CheckOutPage/CheckOutPage";
import UserProfilePage from "./Pages/UserProfilePage/UserProfilePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import UserAddressPage from "./Pages/UserAddressPage/UserAddressPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage/OrderDetailsPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";

// Components
import Navbar from "./Components/Navbar/Navbar";
import BackDrop from "./Components/BackDrop/BackDrop";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import RequireAuth from "./Components/RequireAuth/RequireAuth";

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
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="*" element={<PageNotFound />} />
          <Route
            exact
            path="/user/:id"
            element={
              <RequireAuth>
                <UserProfilePage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/user/:id/address"
            element={
              <RequireAuth>
                <UserAddressPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPasswordPage />}
          />
          <Route
            exact
            path="/order-history"
            element={
              <RequireAuth>
                <OrdersPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/order-details"
            element={
              <RequireAuth>
                <OrderDetailsPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <RequireAuth>
                <CheckOutPage />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
