import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAddedProduct } from "../../../app/reduxSlice/ProductSlice";
import { addToCart } from "../../../app/reduxSlice/CartSlice";
import { FaCartPlus } from "react-icons/fa";
import { baseURL } from "../../../utils/api";



const Product = ({ data, id }) => {
  const { addedProduct } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(addedProduct);
    if (addedProduct.length > 0) {
      dispatch(addToCart(addedProduct));
    }
  }, [addedProduct]);

  return (
    <div className="product-card">
      <div className="thumbnail">
      <img
        
          src= {`${baseURL}/storage/` + data.image_url[0]}
          alt="image"
          onClick={() => navigate("/product/" + id)}
        />
        <div className="addToCart">
          <button
            className="add "
            onClick={() => {
              console.log(id);
              dispatch(getAddedProduct(id));
            }}
          >
            {" "}
            <FaCartPlus /> ADD TO CART
          </button>
        </div>
      </div>
      <div className="prod-details">
        <div className="name">{data.title}</div>
        <div className="price-rating">
          <span className="price">{data.price} MAD</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
