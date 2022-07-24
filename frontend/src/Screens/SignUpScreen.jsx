import "../Styles/SignUpScreen.css";

function SignUpScreenen() {
  return (
    <div className="signupScreenen">
      <p className="signupScreenen__heading">Sign Up</p>
      <div className="signupScreenen__info">
        <p>Name</p>
        <input type="text" className="signupScreenen__name" />
        <p>Mobile number</p>
        <input type="number" className="signupScreenen__mobNum" />
        <p>Email</p>
        <input type="text" className="signupScreenen__email" />
        <p>Password</p>
        <input type="password" className="signupScreenen__password" />
        <p>Confirm password</p>
        <input type="password" className="signupScreenen__confirmPass" />
        <button className="signupScreenen__button">Sign Up</button>
      </div>
    </div>
  );
}

export default SignUpScreenen;
