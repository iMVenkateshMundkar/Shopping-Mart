import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import { getBrands, getProducts } from "../../Redux/App/product/productAction";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { brands } = useSelector(state => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedBrands, setSearchedBrands] = useState();
  const [showResultBox, setShowResultsBox] = useState(true);
  const dispatch = useDispatch();

  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const sortBy = searchParams.get("sortBy");


  const handleSearch = () => {
    let params = {
      page,
      size,
    }
    sortBy && (params.sortBy = sortBy);
    params.brand = query;
    setSearchParams(params);
    dispatch(getProducts(page, sortBy, query));
  }

  useEffect(() => {
    if (brands?.length === 0) {
      dispatch(getBrands());
    }
  }, [brands?.length])

  useEffect(() => {
    if (query) {
      let temp = brands.filter((item) =>
        item.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
          ? true
          : false
      )
        .map((item) => {
          return item;
        });
      setSearchedBrands(temp);
    }
    else {
      setSearchedBrands([]);
    }
  }, [query]);
  console.log(query);

  return (
    <div className="searchBar">
      <div className="searchBar__input">
        <div>
          <input
            type="text"
            value={query}
            onFocus={() => setShowResultsBox(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by brands"
          />
          {query && (
            <div className="cross" onClick={() => setQuery("")}>
              <ClearIcon color="action" />
            </div>
          )}
        </div>
        <button onClick={() => handleSearch()} className="searchBar__searchIcon">
          <SearchIcon fontSize="medium" />
        </button>
      </div>
      {(showResultBox && query.length > 0) && <div className="searchResults">
        {
          searchedBrands?.length > 0 && searchedBrands.map((brand, index) => {
            return <p key={index} onClick={() => {
              setQuery(brand);
              setShowResultsBox(false)
            }}>{brand}</p>
          })
        }
      </div>}
    </div>
  );
};

export default SearchBar;
