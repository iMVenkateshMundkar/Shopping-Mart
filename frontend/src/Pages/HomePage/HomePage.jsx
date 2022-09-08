import "./HomePage.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProducts } from "../../Redux/App/product/productAction";

// Components
import Product from "../../Components/Product/Product";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterSidebar from "../../Components/FilterSidebar/FilterSidebar";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const { products, isLoading, error } = allProducts;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [products.length, dispatch]);

  return (
    <div className="homepage">
      <FilterSidebar />
      <div className="product__list">
        <div className="homepage__heading">
          <p className="homepage__headTitle">Hair Care Products</p>
          <p className="homepage__count">{products.length} results</p>
        </div>
        <div className="homepage__functionality">
          <div className="homepage__sorting">
            <label>Sort by</label>
            <select name="sortOrder">
              <option value="default">Default</option>
              <option value="priceAscending">Price:Low to High</option>
              <option value="priceDescending">Price:High to Low</option>
              <option value="title">A-Z</option>
            </select>
          </div>
          {/* <div className="products__pagination">pagination</div> */}
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

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useSearchParams } from "react-router-dom";
// import FilterSidebar from "../../Components/FilterSidebar/FilterSidebar";
// import ProductFromProductsPage from "../../Components/ProductFromProductsPage/ProductFromProductsPage";

// import {
//   getProducts,
//   getSortedProducts,
// } from "../../Redux/ProductReducer/productAction";
// import "./ProductsPage.css";

// const ProductsPage = () => {
//   const products = useSelector((state) => state.product.products);
//   const dispatch = useDispatch();
//   const [sortOrder, setSortOrder] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const en_brand_content = searchParams.getAll("en_brand_content");
//   const en_hairCategory_content = searchParams.getAll(
//     "en_hairCategory_content"
//   );
//   const en_electricalTools_content = searchParams.getAll(
//     "en_electricalTools_content"
//   );
//   const en_hairCareBenefit_content = searchParams.getAll(
//     "en_hairCareBenefit_content"
//   );
//   const en_keyIngredients_content = searchParams.getAll(
//     "en_keyIngredients_content"
//   );
//   const en_price_content = searchParams.getAll("en_price_content");
//   const en_savingPercent_content = searchParams.getAll(
//     "en_savingPercent_content"
//   );
//   const en_averageReviewScore_content = searchParams.getAll(
//     "en_averageReviewScore_content"
//   );
//   const location = useLocation();
//   const handleSortOrder = (e) => {
//     setSortOrder(e.target.value);

//     console.log(products);
//   };

//   useEffect(() => {
//     if (sortOrder === "priceAscending") {
//       products.sort((a, b) => a.priceDiscount - b.priceDiscount);
//     } else if (sortOrder === "priceDescending") {
//       products.sort((a, b) => b.priceDiscount - a.priceDiscount);
//     } else if (sortOrder === "title") {
//       console.log(sortOrder);
//       products.sort((a, b) => {
//         if (a.title > b.title) {
//           return 1;
//         } else {
//           return -1;
//         }
//       });
//       console.log(products);
//     } else if (sortOrder === "default") {
//       console.log(sortOrder);
//       dispatch(getProducts());
//     }
//   }, [sortOrder, dispatch]);

//   useEffect(() => {
//     if (products?.length === 0) {
//       dispatch(getProducts({}));
//     }
//   }, [products?.length, dispatch, sortOrder]);
//   // console.log(sortOrder);
//   // console.log(products);
//   // console.log("location", location);

//   useEffect(() => {
//     if (sortOrder) {
//       setSearchParams({
//         sortOrder,
//       });
//     }
//   }, [sortOrder, setSearchParams]);

//   console.log(products);

//   return (
//     <>
//       <div className="productspage">
//         <FilterSidebar />
//         <div className="products__list">
//           <div className="products__heading">
//             <p className="products__headTitle">Hair Care Products</p>
//             <p className="products__count">{products.length} results</p>
//           </div>
//           <div className="products__functionality">
//             <div className="products__sorting">
//               <label>Sort by</label>
//               <select name="sortOrder" onChange={(e) => handleSortOrder(e)}>
//                 <option value="default">Default</option>
//                 <option value="priceAscending">Price:Low to High</option>
//                 <option value="priceDescending">Price:High to Low</option>
//                 <option value="title">A-Z</option>
//               </select>
//             </div>
//             {/* <div className="products__pagination">pagination</div> */}
//           </div>
//           <div className="products__allproducts">
//             {products?.length > 0 &&
//               products?.map((item) => {
//                 return <ProductFromProductsPage key={item._id} item={item} />;
//               })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsPage;
