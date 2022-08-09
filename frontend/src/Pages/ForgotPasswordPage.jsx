import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");

  const handleVerification = () => {
    
  }
  return (
    <div className="loginpage">
      <p className="loginpage__heading">Reset Password</p>
      <form className="loginpage__info">
        {isVerified ? (
          <>
            <label className="required">Password</label>
            <input
              className="loginpage__password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <label className="required">Email</label>
            <input
              className="loginpage__email"
              type="email"
              value={email}
              placeholder="Enter registered email id"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleVerification} className="loginpage__button">Verify</button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
