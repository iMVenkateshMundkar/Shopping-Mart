import "../Styles/SignInScreen.css";
import { Link } from "react-router-dom";

const SignInScreen = () => {
  return (
    <div className="signinScreen">
      <p className="signinScreen__heading">Sign In</p>
      <div className="signinScreen__info">
        <p>Email or mobile phone number</p>
        <input type="text" className="signinScreen__email" />
        <p>Password</p>
        <input type="password" className="signinScreen__password" />
        <button className="signinScreen__button">Sign In</button>
      </div>
      <div className="signinScreen__wayToSignUp">
        <p>If you are a new user</p>
        <Link to={"/signup"}>
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default SignInScreen;
