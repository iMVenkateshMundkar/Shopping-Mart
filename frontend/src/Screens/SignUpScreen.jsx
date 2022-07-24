import { useState } from "react";
import "../Styles/SignUpScreen.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SignUpScreenen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("handling sign up");
  };
  return (
    <div className="signupScreen">
      <p className="signupScreen__heading">Sign Up</p>
      {/* <div className="signupScreen__info"> */}
      <form className="signupScreen__info" onSubmit={handleSignUp}>
        <label>Name</label>
        <input type="text" className="signupScreen__name" />
        <label>Mobile number</label>
        <input type="number" className="signupScreen__mobNum" />
        <label>Email</label>
        <input type="text" className="signupScreen__email" />
        <div className="showPasswordDiv">
          <label>Password</label>
          {showPassword ? (
            <VisibilityOffIcon
              fontSize="small"
              className="VisibilityOffIcon"
              onClick={() => setShowPassword((prv) => !prv)}
            />
          ) : (
            <VisibilityIcon
              fontSize="small"
              className="VisibilityOffIcon"
              onClick={() => setShowPassword((prv) => !prv)}
            />
          )}
        </div>
        {showPassword ? (
          <input type="text" className="signupScreen__password" />
        ) : (
          <input type="password" className="signupScreen__password" />
        )}
        <div className="showPasswordDiv">
          <label>Confirm password</label>
          {showCPassword ? (
            <VisibilityOffIcon
              fontSize="small"
              className="VisibilityOffIcon"
              onClick={() => setShowCPassword((prv) => !prv)}
            />
          ) : (
            <VisibilityIcon
              fontSize="small"
              className="VisibilityOffIcon"
              onClick={() => setShowCPassword((prv) => !prv)}
            />
          )}
        </div>
        {showCPassword ? (
          <input type="text" className="signupScreen__confirmPass" />
        ) : (
          <input type="password" className="signupScreen__confirmPass" />
        )}
        <button type="submit" className="signupScreen__button">
          Sign Up
        </button>
      </form>
      {/* </div> */}
    </div>
  );
}

export default SignUpScreenen;
