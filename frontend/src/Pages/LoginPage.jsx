import "../Styles/LoginPage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../Redux/Auth/userActions";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
} from "../Redux/Auth/userActionTypes";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const cameFrom = location.state.from.pathname;
  const handlelogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password })).then((r) => {
      console.log(r);
      if (r.type === USER_LOGIN_FAILURE) {
        alert("Invalid Email or Password");
      } else if (r.type === USER_LOGIN_SUCCESS) {
        navigate(cameFrom);
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="loginpage">
      <p className="loginpage__heading">Log In</p>
      <form className="loginpage__info" onSubmit={handlelogin}>
        <label className="required">Email</label>
        <input
          className="loginpage__email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="loginpage__passReset">
          <label className="required">Password</label>
          {/* <p onClick={handleResetPassword}>Forgot your password?</p> */}
        </div>

        <input
          className="loginpage__password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="loginpage__button">
          Log In
        </button>
      </form>
      <div className="loginpage__wayToSignup">
        <p>
          New user?
          <Link to={"/signup"}>
            <span>Create an Account</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
