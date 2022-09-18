import "./HomePage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProducts } from "../../Redux/App/product/productAction";

// Components
import Product from "../../Components/Product/Product";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterSidebar from "../../Components/FilterSidebar/FilterSidebar";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const { products, isLoading, error } = allProducts;
  const brand = searchParams.get("brand");

  useEffect(() => {
    if (products.length === 0 || pageNumber || sortBy) {
      dispatch(getProducts({ pageNumber, sortBy }));
    }
  }, [products.length, dispatch, pageNumber, sortBy]);

  useEffect(() => {
    if (pageNumber || products?.length || sortBy) {
      let params = { page: pageNumber, size: products.length };
      sortBy && (params.sortBy = sortBy);
      brand && (params.brand = brand);
      setSearchParams(params);
    }
  }, [pageNumber, products?.length, sortBy]);

  return (
    <div className="homepage">
      <div className="product__list">
        <div className="homepage__heading">
          <p className="homepage__headTitle">Hair Care Products</p>
          <p className="homepage__count">{products.length} results</p>
        </div>
        <div className="homepage__functionality">
          <div className="homepage__sorting">
            <label>Sort by</label>
            <select name="sortBy" onChange={(e) => {
              setPageNumber(1);
              setSortBy(e.target.value)
            }}>
              <option value="">Default</option>
              <option value="priceAsc">Price:Low to High</option>
              <option value="priceDesc">Price:High to Low</option>
              <option value="title">A-Z</option>
            </select>
          </div>
          <div className="products__pagination">
            <div className={pageNumber === 1 && "current__page__number"} onClick={() => setPageNumber(1)}>1</div>
            <div className={pageNumber === 2 && "current__page__number"} onClick={() => setPageNumber(2)}>2</div>
            <div className={pageNumber === 3 && "current__page__number"} onClick={() => setPageNumber(3)}>3</div>
            <div className={pageNumber === 4 && "current__page__number"} onClick={() => setPageNumber(4)}>4</div>
            <div className={pageNumber === 5 && "current__page__number"} onClick={() => setPageNumber(5)}>5</div>
            <div className={pageNumber === 6 && "current__page__number"} onClick={() => setPageNumber(6)}>6</div>
          </div>
        </div>
        <div className="homepage__products">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
