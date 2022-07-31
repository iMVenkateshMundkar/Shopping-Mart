import "../Styles/SignInPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignInPage = () => {
  const [userEmailOrMobile, setUserEmailOrMobile] = useState("");
  const [userPass, setUserPass] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();
    if (userEmailOrMobile && userPass) {
      console.log(userEmailOrMobile, userPass);
    }
  };
  return (
    <div className="signinpage">
      <p className="signinpage__heading">Sign In</p>
      <form className="signinpage__info" onSubmit={handleSignIn}>
        <label className="required">Email or mobile phone number</label>
        <input
          className="signinpage__email"
          type="email"
          value={userEmailOrMobile}
          onChange={(e) => setUserEmailOrMobile(e.target.value)}
          required
        />
        <label className="required">Password</label>
        <input
          className="signinpage__password"
          type="password"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
          required
        />
        <button type="submit" className="signinpage__button">
          Sign In
        </button>
      </form>
      <div className="signinpage__wayToSignUp">
        <p>
          If you are a new user
          <Link to={"/signup"}>
            <span>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
