import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSideBar from "../../Components/UserProfileSideBar/UserProfileSideBar";
import AddIcon from "@mui/icons-material/Add";
import { v4 } from "uuid";
import { userProfileUpdate } from "../../Redux/Auth/userActions";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditAddress from "../../Components/AddEditAddress/AddEditAddress";

const initialState = {
  aName: "",
  aMobile: "",
  aPincode: "",
  aArea: "",
  aCity: "",
  aState: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "aName":
      return {
        ...state,
        aName: payload,
      };
    case "aMobile":
      return {
        ...state,
        aMobile: payload,
      };
    case "aPincode":
      return {
        ...state,
        aPincode: payload,
      };
    case "aArea":
      return {
        ...state,
        aArea: payload,
      };
    case "aCity":
      return {
        ...state,
        aCity: payload,
      };
    case "aState":
      return {
        ...state,
        aState: payload,
      };
    default:
      return state;
  }
};

const UserAddressPage = () => {
  const user = useSelector((store) => store.user);
  const [state, setter] = useReducer(reducer, initialState);
  const [isReadyToAddAddress, setIsReadyToAddAddress] = useState(false);
  const { loggedInUser } = user;
  const dispatch = useDispatch();

  const handleAddAddress = (e) => {
    e.preventDefault();
    setIsReadyToAddAddress(false);
    state.a_id = v4();
    dispatch(
      userProfileUpdate(loggedInUser._id, {
        address: [...loggedInUser.address, state],
      })
    );
  };

  const handleDeleteAddress = (address_id) => {
    let newAddress = loggedInUser.address;
    let index = -1;
    newAddress.map((a, i) => {
      if (a.a_id === address_id) {
        index = i;
      }
    });
    newAddress.splice(index, 1);
    dispatch(
      userProfileUpdate(loggedInUser._id, {
        address: newAddress,
      })
    );
  };

  return (
    <div className="userprofile">
      <UserProfileSideBar page={"address"} />
      <div className="userprofile__right">
        <div className="address__info">
          <h3>Address Information</h3>
          {isReadyToAddAddress ? (
            <AddEditAddress
              heading={"ADD A NEW ADDRESS"}
              setter={setter}
              state={state}
              setReadyState={setIsReadyToAddAddress}
              handleAddAddress={handleAddAddress}
              operation={"ADD"}
            />
          ) : (
            <div
              onClick={() => {
                setIsReadyToAddAddress(true);
              }}
              className="address__add address__p"
            >
              <AddIcon /> ADD A NEW ADDRESS
            </div>
          )}
          <div className="allAddresses__add">
            {loggedInUser.address.length > 0 ? (
              loggedInUser.address.map((ad, i) => (
                <div key={i} className="address__showBlock">
                  <div className="address__showBlockHead">
                    <p className="head__name">{ad.aName}</p>
                    <p className="head__mobile">{ad.aMobile}</p>
                  </div>
                  <p className="body__area">
                    {ad.aArea}, {ad.aCity}, {ad.aState}
                  </p>
                  <div className="delete__address">
                    <p className="body__pincode">{ad.aPincode}</p>
                    <DeleteIcon
                      onClick={() => handleDeleteAddress(ad.a_id)}
                      style={{ cursor: "pointer" }}
                      sx={{ color: "red" }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No address added</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddressPage;
