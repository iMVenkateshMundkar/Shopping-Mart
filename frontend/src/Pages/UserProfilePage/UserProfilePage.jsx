import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserProfilePage.css";
import { userProfileUpdate } from "../../Redux/Auth/userActions";
import UserProfileSideBar from "../../Components/UserProfileSideBar/UserProfileSideBar";
import swal from "sweetalert";
import {
  USER_PROFILE_UPDATE_FAILURE,
  USER_PROFILE_UPDATE_SUCCESS,
} from "../../Redux/Auth/userActionTypes";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;
  const [name, setName] = useState(loggedInUser.name);
  const [username, setUsername] = useState(loggedInUser.username);
  const [mobile, setMobile] = useState(loggedInUser.mobile);
  const [email, setEmail] = useState(loggedInUser.email);
  const [isReadyForEdit, setIsReadyForEdit] = useState(false);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsReadyForEdit(false);
    dispatch(
      userProfileUpdate(loggedInUser._id, {
        name,
        username,
        email,
        mobile,
      })
    );
  };

  return (
    <div className="userprofile">
      <UserProfileSideBar page={"personal"} />
      <div className="userprofile__right">
        <div className="personal__info">
          <div className="personal__edit">
            <h3>Personal Information</h3>
            <p onClick={() => setIsReadyForEdit((prv) => !prv)}>
              {isReadyForEdit ? "Cancel" : "Edit"}
            </p>
          </div>
          <form onSubmit={handleEditProfile} className="personal__form">
            <div className="personal__infoEdit">
              <div className="personal__input">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isReadyForEdit}
                />
              </div>
              <div className="personal__input">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isReadyForEdit}
                />
              </div>
              <div className="personal__input">
                <label>Mobile No.</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={!isReadyForEdit}
                />
              </div>
              <div className="personal__input">
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
    </div>
  );
};

export default UserProfilePage;
