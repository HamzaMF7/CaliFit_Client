import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { getProducts } from "../../app/reduxSlice/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
    console.log(products);

  // console.log(products);
  // console.log(productsStatus);

  return (
    <div>
      <Banner />
      <div className="container main-content">
        <div className="layout">
          <Category />
          {productsStatus === "LOADING" ? (
            <Spin tip="Loading..." size="large">
              <div className="content" />
            </Spin>
          ) : productsStatus === "SUCCEEDED" ? (
            <Products headingText="All Products" products={products} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;

