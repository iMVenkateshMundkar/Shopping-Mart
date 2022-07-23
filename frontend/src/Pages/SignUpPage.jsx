import '../Styles/SignUpPage.css'

function SignUpPage() {
  return (
    <div className="signuppage">
      <p className='signuppage__heading'>Sign Up</p>
      <div className="signuppage__info">
        <p>Name</p>
        <input type="text" className="signuppage__name" />
        <p>Mobile number</p>
        <input type="number" className="signuppage__mobNum" />
        <p>Email</p>
        <input type="text" className="signuppage__email" />
        <p>Password</p>
        <input type="password" className="signuppage__password" />
        <p>Confirm password</p>
        <input type="password" className="signuppage__confirmPass" />
        <button className="signuppage__button">Sign Up</button>
      </div>
    </div>
  )
}

export default SignUpPage