import { useParams } from "react-router-dom";
import "./Category.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { getProductsByCategory } from "../../app/reduxSlice/ProductSlice";
import Products from "../Products/Products";

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductsByCategory(id));
  }, [dispatch, id]);

  if (!filteredProducts) {
    return (
      <Spin tip="Loading..." size="large">
        <div className="content"></div>
      </Spin>
    );
  }

  return (
    <div className="category-main-content">
        <div className="category-title">
          <h2>{filteredProducts[0]?.category} Products</h2>
          <p>{filteredProducts[0]?.category} Products</p>
        </div>
      <div className="container">
        <Products innerPage={true} products={filteredProducts} />
      </div>
    </div>
  );
};

export default Category;

// {/* {
//               data?.data?.[0]?.attributes?.categories?.data?.[0]
//                   ?.attributes?.title
//           } */}

// useEffect(()=>{
//   console.log(products);
//     console.log(isLoading);
//     console.log(isSuccess);
//   },[isSuccess])

// useEffect(()=>{
//     if(isLoading == false && isSuccess== true) {
//         dispatch(resetState());
//       }
//     },[isLoading , isSuccess])

// if (isLoading) return(
//   <Spin  size="large">
//   <div className="content"></div>
// </Spin>
// )
