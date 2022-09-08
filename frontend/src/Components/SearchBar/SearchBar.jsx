import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/App/product/productAction";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const products = useSelector((state) => state.allProducts.products);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputText === "") {
      setSearchedProducts([]);
    } else {
      const newSearchedProducts = products.filter(
        (item) => item.name.toLowerCase() === inputText.toLowerCase()
      );
      // console.log(newSearchedProducts);
    }
  };

  useEffect(() => {
    if (products?.length === 0) {
      dispatch(getProducts());
    }
  }, []);
  // console.log(products);

  return (
    <form onSubmit={handleSearch} className="searchBar">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Search products"
        required
      />
      {inputText && (
        <div className="cross" onClick={() => setInputText("")}>
          <ClearIcon color="action" />
        </div>
      )}
      <button type="submit" className="searchBar__searchIcon">
        <SearchIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default SearchBar;
