import React from "react";

const AddEditAddress = ({
  heading,
  setter,
  state,
  setReadyState,
  handleAddAddress,
  operation,
}) => {
  const states = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  return (
    <div className="address__addBlock">
      <div className="address__addHeading">
        <p className="address__p">{heading}</p>
        <p className="cancelAddress" onClick={() => setReadyState(false)}>
          Cancel
        </p>
      </div>
      <form onSubmit={handleAddAddress} className="address__form">
        <div>
          <label className="required">Name</label>
          <input
            type="text"
            placeholder="name"
            value={state.aName}
            onChange={(e) => setter({ type: "aName", payload: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="required">Mobile</label>
          <input
            type="number"
            placeholder="mobile"
            value={state.aMobile}
            maxLength={10}
            minLength={10}
            onChange={(e) =>
              setter({ type: "aMobile", payload: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="required">Pincode</label>
          <input
            type="number"
            maxLength={6}
            minLength={6}
            value={state.aPincode}
            placeholder="pincode"
            onChange={(e) =>
              setter({ type: "aPincode", payload: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="required">Address Area</label>
          <textarea
            //   name="address add"
            placeholder="address area"
            id=""
            cols="10"
            rows="2"
            value={state.aArea}
            onChange={(e) => setter({ type: "aArea", payload: e.target.value })}
            required
          ></textarea>
        </div>
        <div>
          <label className="required">City / Town</label>
          <input
            type="text"
            placeholder="city / town"
            value={state.aCity}
            onChange={(e) => setter({ type: "aCity", payload: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="required">State</label>
          <select
            name="aState"
            required
            onChange={(e) =>
              setter({ type: "aState", payload: e.target.value })
            }
          >
            <option value="">select state</option>
            {states.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{operation}</button>
      </form>
    </div>
  );
};

export default AddEditAddress;
