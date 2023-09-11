import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../../app/reduxSlice/ProductSlice";
import Product from "../../Products/Product/Product";
import "./RelatedProducts.scss"

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const { relatedProducts, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getRelatedProducts(productId));
  }, [productId]);

  useEffect(() => {
    console.log("related products : ", relatedProducts);
  }, [relatedProducts]);

  return (
    <div className="related-products">
      <div className="sec-heading">
        <p>Related Products</p>
      </div>
      <div className="products-scroll">
        {relatedProducts.map((product) => (
          <Product key={product.id} id={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
