import "./Products.scss";
import Product from "./Product/Product";
import { useEffect } from "react";
import { Spin } from "antd";

const Products = ({ products, headingText, innerPage }) => {
  return (
    <>
      {!innerPage &&<div className="sec-heading">
        <h2>{headingText}</h2>
        <p>{headingText}</p>
        </div> }
      {products && (
        <div className="products-container">
          <div className="products">
            {products?.map((product) => (
              <Product key={product.id} id={product.id} data={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;

// {
//   /* {!innerPage && <div className="sec-heading">{headingText}</div>}
// <div className={`products ${innerPage ? "innerPage" : ""}`}>
// {products?.data?.map((product) => (
//     <Product
//     key={product.id}
//     id={product.id}
//     data={product.attributes}
//     />
//     ))}
// </div> */
// }

// {
//   /* <div className="sec-heading">{headingText}</div>
// <div className="products">
// <Product/>
// <Product/>
// <Product/>
// <Product/>
// <Product/>
// <Product/>
// <Product/>
// <Product/>
// </div> */
// }
