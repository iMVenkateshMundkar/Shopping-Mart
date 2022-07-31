import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/SignUpPage.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const initialState = {
  name: "",
  username: "",
  mobile: 0,
  email: "",
  pass: "",
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
    case "pass":
      return {
        ...state,
        pass: payload,
      };

    default:
      return state;
  }
};

function SignUpPage() {
  const [showPass, setShowPass] = useState(true);
  const [showCPass, setShowCPass] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cPass, setCPass] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signuppage">
      <p className="signuppage__heading">Sign Up</p>
      <form onSubmit={handleSignUp} className="signuppage__info">
        <label className="required">Name</label>
        <input
          type="text"
          className="signuppage__in"
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
          required
        />
        <label className="required">Username</label>
        <input
          type="text"
          className="signuppage__in"
          onChange={(e) =>
            dispatch({ type: "username", payload: e.target.value })
          }
          required
        />
        <label className="required">Mobile number</label>
        <input
          type="number"
          className="signuppage__in"
          onChange={(e) =>
            dispatch({ type: "mobile", payload: e.target.value })
          }
          required
        />
        <label className="required">Email</label>
        <input
          type="text"
          className="signuppage__in"
          onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
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
            className="signuppage__in"
            onChange={(e) =>
              dispatch({ type: "pass", payload: e.target.value })
            }
            required
          />
        ) : (
          <input
            type="text"
            className="signuppage__in"
            onChange={(e) =>
              dispatch({ type: "pass", payload: e.target.value })
            }
            required
          />
        )}
        <div className="showPassword">
          <label className="required">Confirm Password</label>
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
            onChange={(e) => setCPass(e.target.value)}
            required
          />
        ) : (
          <input
            type="text"
            style={{ marginBottom: "0px" }}
            className="signuppage__confirmPass"
            onChange={(e) => setCPass(e.target.value)}
            required
          />
        )}
        {cPass !== state.pass && (
          <p className="passwordMatch">Both passwords should match</p>
        )}

        <button type="submit" className="signuppage__button">
          Sign Up
        </button>
      </form>
      <div className="signuppage__wayToSignIn">
        <p>
          Already have an account
          <Link to={"/signin"}>
            <span>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
