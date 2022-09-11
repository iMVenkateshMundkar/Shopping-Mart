import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../Redux/Auth/userActions";
import { Link, Navigate, useLocation } from "react-router-dom";

const UserProfileSideBar = ({ page }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;
  const location = useLocation();

  const handleLogOut = () => {
    dispatch(userLogout());
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  };
  return (
    <div className="userprofile__left">
      <div className="account">
        <AccountCircleIcon
          className="accountIcon"
          sx={{ fontSize: "100px" }}
          color={"primary"}
        />
        <h3>{loggedInUser.username}</h3>
        <button onClick={handleLogOut}>
          <LogoutIcon />
          Log Out
        </button>
      </div>
      <div className="options">
        <Link to={`/user/${loggedInUser._id}`}>
          {page === "personal" ? (
            <p
              style={{
                backgroundColor: "rgb(236, 243, 255)",
                color: "rgb(4, 4, 200)",
              }}
            >
              Personal Information
            </p>
          ) : (
            <p>Personal Information</p>
          )}
        </Link>
        <Link to={`/user/${loggedInUser._id}/address`}>
          {page === "address" ? (
            <p
              style={{
                backgroundColor: "rgb(236, 243, 255)",
                color: "rgb(4, 4, 200)",
              }}
            >
              Manage Address
            </p>
          ) : (
            <p>Manage Address</p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default UserProfileSideBar;
