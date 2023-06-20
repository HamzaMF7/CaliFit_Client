import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import { TbCircleFilled } from "react-icons/tb";
import "./SingleProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getSingleProduct,
} from "../../app/reduxSlice/ProductSlice";
import { addToCart } from "../../app/reduxSlice/CartSlice";
import { Spin } from "antd";

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { singleProduct, products } = useSelector((state) => state.product);

  useEffect(() => {
    if (products.length <= 0) {
      dispatch(getProducts()).then(() => dispatch(getSingleProduct(id)));
    } else dispatch(getSingleProduct(id));
  }, [id]);

  if (singleProduct.length <= 0) {
    return (
      <Spin tip="Loading..." size="large">
        <div className="content"></div>
      </Spin>
    );
  }

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={
                "http://127.0.0.1:8000/storage/" + singleProduct[0]?.image_url
              }
              alt="product"
            />
          </div>
          <div className="right">
            <span className="name">{singleProduct[0]?.title}</span>
            <span className="price">{singleProduct[0]?.price} MAD</span>
            {singleProduct[0]?.quantity >= 1 ? (
              <span className="inStock">
                <TbCircleFilled /> in stock
              </span>
            ) : (
              <span className="outStock">
                <TbCircleFilled /> out of stock
              </span>
            )}
            <span className="desc">{singleProduct[0]?.description}</span>
            <span className="delivery">
              Delivery time: <span className="days">1-3 days</span>{" "}
            </span>
            <div className="cart-buttons">
              <button
                className="add-to-cart-button"
                onClick={() => {
                  dispatch(addToCart(singleProduct));
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                {/* Category:{" "} */}
                <span>
                  {/* {
                                        product.categories.data[0].attributes
                                            .title
                                    } */}
                  title
                </span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts
            productId={id}
          />
      </div>
    </div>
  );
};

export default SingleProduct;
