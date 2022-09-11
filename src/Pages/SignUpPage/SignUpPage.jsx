import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import swal from "sweetalert";
import {
  userLogin,
  userPresent,
  userSignup,
} from "../../Redux/Auth/userActions";
import {
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_SUCCESS,
} from "../../Redux/Auth/userActionTypes";

const initialState = {
  name: "",
  username: "",
  mobile: "",
  email: "",
  password: "",
  passwordCheck: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "name":
      return {
        ...state,
        name: payload,
      };
    case "username":
      return {
        ...state,
        username: payload,
      };
    case "mobile":
      return {
        ...state,
        mobile: payload,
      };
    case "email":
      return {
        ...state,
        email: payload,
      };
    case "password":
      return {
        ...state,
        password: payload,
      };
    case "passwordCheck":
      return {
        ...state,
        passwordCheck: payload,
      };

    default:
      return state;
  }
};

function SignUpPage() {
  const user = useSelector((state) => state.user);
  const { loggedInUser, isAuth } = user;
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(true);
  const [state, setter] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    state.address = [];
    state.orders = [];
    state.cartItems = [];
    state.selectedCartItems = [];
    dispatch(userSignup(state)).then((r) => {
      if (r.type === USER_SIGNUP_SUCCESS) {
        swal({
          icon: "success",
          title: "'Account has been created succsessfully'",
        });
        dispatch(
          userLogin({ email: state.email, password: state.password })
        ).then((r) => {
          if (r.type === USER_LOGIN_SUCCESS) {
            navigate("/");
          }
        });
      } else if (r.type === USER_SIGNUP_FAILURE) {
        swal({
          icon: "error",
          title: "'Signup credentials are invalid'",
        });
      }
    });
  };

  if (isAuth) {
    return <Navigate to={`/user/${loggedInUser.id}`} />;
  }

  return (
    <div className="signuppage">
      <p className="signuppage__heading">Sign Up</p>
      <form
        onSubmit={(e) => {
          if (state.password === state.passwordCheck) {
            handleSignup(e);
          } else {
            e.preventDefault();
            swal({
              icon: "error",
              title: "'Passwords should be matched'",
            });
          }
        }}
        className="signuppage__info"
      >
        <label className="required">Name</label>
        <input
          type="text"
          className="signuppage__in"
          value={state.name}
          onChange={(e) => setter({ type: "name", payload: e.target.value })}
          required
        />
        <label className="required">Username</label>
        <input
          type="text"
          className="signuppage__in"
          value={state.username}
          onChange={(e) =>
            setter({ type: "username", payload: e.target.value })
          }
          required
        />
        <label className="required">Mobile number</label>
        <input
          type="number"
          className="signuppage__confirmPass"
          value={state.mobile}
          onChange={(e) => setter({ type: "mobile", payload: e.target.value })}
          required
        />
        {state.mobile.length !== 10 && state.mobile.length > 0 && (
          <p className="passwordMatch">Invalid Mobile No.</p>
        )}
        <label className="required">Email</label>
        <input
          type="email"
          className="signuppage__in"
          value={state.email}
          onChange={(e) => setter({ type: "email", payload: e.target.value })}
          required
        />
        <div className="showPassword">
          <label className="required">Password</label>
          {showPass ? (
            <VisibilityIcon
              className="eyeIcon"
              style={{ cursor: "pointer", marginTop: "5px" }}
              onClick={() => setShowPass((prv) => !prv)}
              fontSize="small"
            />
          ) : (
            <VisibilityOffIcon
              className="eyeIcon"
              style={{ cursor: "pointer", marginTop: "5px" }}
              onClick={() => setShowPass((prv) => !prv)}
              fontSize="small"
            />
          )}
        </div>
        {showPass ? (
          <input
            type="password"
            className="signuppage__in"
            value={state.password}
            onChange={(e) =>
              setter({ type: "password", payload: e.target.value })
            }
            minLength={8}
            required
          />
        ) : (
          <input
            type="text"
            className="signuppage__in"
            value={state.password}
            onChange={(e) =>
              setter({ type: "password", payload: e.target.value })
            }
            minLength={8}
            required
          />
        )}
        {state.password.length < 8 && state.password.length > 0 && (
          <p className="passwordLength">
            Password should contain atleast 8 characters
          </p>
        )}
        <label className="required">Confirm Password</label>
        {/* {showCPass ? ( */}
        <input
          type="password"
          className="signuppage__in"
          value={state.passwordCheck}
          onChange={(e) =>
            setter({ type: "passwordCheck", payload: e.target.value })
          }
          required
        />
        {state.passwordCheck !== state.password && (
          <p className="passwordMatch">Both passwords should match</p>
        )}

        <button type="submit" className="signuppage__button">
          Sign Up
        </button>
      </form>
      <div className="signuppage__wayToLogin">
        <p>
          Already have an account?
          <Link to={"/login"}>
            <span>Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
