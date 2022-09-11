import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/App/product/productAction";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const products = useSelector(state => state.products.products);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (query && products?.length === 0) {
      dispatch(getProducts({}));
    }
  }, [query, products?.length])

  console.log(query);

  // useEffect(() => {

  // }, [])

  return (
    <div className="searchBar">
      <div className="searchBar__input">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by brands"
          />
          {query && (
            <div className="cross" onClick={() => setQuery("")}>
              <ClearIcon color="action" />
            </div>
          )}
        </div>
        <button type="submit" className="searchBar__searchIcon">
          <SearchIcon fontSize="medium" />
        </button>
      </div>
      {/* <div className="searchResults"></div> */}
    </div>
  );
};

export default SearchBar;
