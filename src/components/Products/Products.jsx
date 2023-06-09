import "./Products.scss";
import Product from "./Product/Product";
import { useEffect, useRef, useState } from "react";
import { Spin, Pagination } from "antd";

const Products = ({ products, headingText, innerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const productsContainerRef = useRef(null);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  useEffect(() => {
    if (productsContainerRef.current && currentPage > 1) {
      productsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <>
      {!innerPage && (
        <div className="sec-heading">
          {/* <h2>{headingText}</h2> */}
          <p>{headingText}</p>
        </div>
      )}
      {products ? (
        <div className="products-container" ref={productsContainerRef}>
          <div className="products">
            {currentProducts.map((product) => (
              <Product key={product.id} id={product.id} data={product} />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={productsPerPage}
              total={products.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper={false}
              hideOnSinglePage={true}
            />
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Products;
