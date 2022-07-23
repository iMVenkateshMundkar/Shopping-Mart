import '../Styles/SignInPage.css';
import {Link} from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className="signinpage">
      <p className='signinpage__heading'>Sign In</p>
      <div className="signinpage__info">
        <p>Email or mobile phone number</p>
        <input type="text" className="signinpage__email" />
        <p>Password</p>
        <input type="password" className="signinpage__password" />
        <button className="signinpage__button">Sign In</button>
      </div>
      <div className="signinpage__wayToSignUp">
        <p>If you are a new user</p>
        <Link to={"/signup"}>
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPage