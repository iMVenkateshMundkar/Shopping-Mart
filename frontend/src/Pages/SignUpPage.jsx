import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignUpPage.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userLogin, userSignup } from "../Redux/Auth/userActions";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
} from "../Redux/Auth/userActionTypes";

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
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(true);
  const [showCPass, setShowCPass] = useState(true);
  const [state, setter] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(userSignup(state)).then((r) => {
      if (r.type === USER_SIGNUP_SUCCESS) {
        dispatch(
          userLogin({ email: state.email, password: state.password })
        ).then((r) => {
          if (r.type === USER_LOGIN_FAILURE) {
            alert("Invalid Email or Password");
          } else if (r.type === USER_LOGIN_SUCCESS) {
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <div className="signuppage">
      <p className="signuppage__heading">Sign Up</p>
      <form onSubmit={handleSignup} className="signuppage__info">
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
          className="signuppage__in"
          value={state.mobile}
          onChange={(e) => setter({ type: "mobile", payload: e.target.value })}
          required
        />
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
              style={{ cursor: "pointer" }}
              onClick={() => setShowPass((prv) => !prv)}
              fontSize="small"
            />
          ) : (
            <VisibilityOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => setShowPass((prv) => !prv)}
              fontSize="small"
            />
          )}
        </div>
        {showPass ? (
          <input
            type="password"
            className="signuppage__confirmPass"
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
            className="signuppage__confirmPass"
            value={state.password}
            onChange={(e) =>
              setter({ type: "password", payload: e.target.value })
            }
            minLength={8}
            required
          />
        )}
        {state.password.length < 8 && (
          <p className="passwordLength">
            Password should contain atleast 8 characters
          </p>
        )}
        <div className="showPassword">
          <label style={{ marginTop: "15px" }} className="required">
            Confirm Password
          </label>
          {showCPass ? (
            <VisibilityIcon
              style={{ cursor: "pointer" }}
              onClick={() => setShowCPass((prv) => !prv)}
              fontSize="small"
            />
          ) : (
            <VisibilityOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => setShowCPass((prv) => !prv)}
              fontSize="small"
            />
          )}
        </div>
        {showCPass ? (
          <input
            type="password"
            className="signuppage__confirmPass"
            value={state.passwordCheck}
            onChange={(e) =>
              setter({ type: "passwordCheck", payload: e.target.value })
            }
            required
          />
        ) : (
          <input
            type="text"
            style={{ marginBottom: "0px" }}
            className="signuppage__confirmPass"
            value={state.passwordCheck}
            onChange={(e) =>
              setter({ type: "passwordCheck", payload: e.target.value })
            }
            required
          />
        )}
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
