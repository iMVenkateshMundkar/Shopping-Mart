import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/UserProfilePage.css";
import { Navigate, useLocation } from "react-router-dom";
import { userLogout, userProfileUpdate } from "../Redux/Auth/userActions";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;
  const [name, setName] = useState(loggedInUser.name);
  const [username, setUsername] = useState(loggedInUser.username);
  const [mobile, setMobile] = useState(loggedInUser.mobile);
  const [email, setEmail] = useState(loggedInUser.email);
  const [isReadyForEdit, setIsReadyForEdit] = useState(false);
  const location = useLocation();

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsReadyForEdit(false);
    dispatch(
      userProfileUpdate(loggedInUser.id, {
        name,
        username,
        email,
        mobile,
      })
    );
  };

  const handleLogOut = () => {
    dispatch(userLogout());
    return <Navigate to={"/login"} state={{ from: location }} replace />
  };

  return (
    <div className="userprofile">
      <div className="userprofile__left">
        <AccountCircleIcon sx={{ fontSize: "100px" }} color="primary" />
        <h3>{loggedInUser.username}</h3>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
      <div className="userprofile__right">
        <div className="userRight__edit">
          <h3>Personal Information</h3>
          <p onClick={() => setIsReadyForEdit((prv) => !prv)}>
            {isReadyForEdit ? "Cancel" : "Edit"}
          </p>
        </div>
        <form onSubmit={handleEditProfile} className="userRight__form">
          <div className="userRight__info">
            <div className="userRight__input">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isReadyForEdit}
              />
            </div>
            <div className="userRight__input">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isReadyForEdit}
              />
            </div>
            <div className="userRight__input">
              <label>Mobile No.</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={!isReadyForEdit}
              />
            </div>
            <div className="userRight__input">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isReadyForEdit}
              />
            </div>
          </div>
          {isReadyForEdit && <button type="submit">Edit & Save</button>}
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;
