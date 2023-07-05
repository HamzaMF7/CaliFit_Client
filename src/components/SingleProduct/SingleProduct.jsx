import { useEffect, useReducer, useRef, useState } from "react";
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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SingleProduct = () => {
  const { id } = useParams();
  const imagesSlider = useRef(null);
  const arrowUp = useRef();
  const arrowDown = useRef(null);
  const [bigImageIndex, setBigImageIndex] = useState(0);
  const [breakPoint , setBreakPoint] = useState(window.matchMedia("(max-width: 992px)").matches);

  const dispatch = useDispatch();
  const { singleProduct, products } = useSelector((state) => state.product);

  const images = singleProduct[0]?.image_url;

  useEffect(() => {
    console.log("break point : ",breakPoint);
  }, [breakPoint]);

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
  const handleScroll = () => {
    // for desktop
    const scrollTop = imagesSlider.current.scrollTop;
    const scrollBottom = imagesSlider.current.scrollHeight - scrollTop;
    // for mobile
    const scrollLeft = imagesSlider.current.scrollLeft;
    const scrollRight =
      imagesSlider.current.scrollWidth -
      imagesSlider.current.clientWidth -
      scrollLeft;

    if (scrollTop >= 70 || scrollLeft >= 70) {
      arrowUp.current.style.display = "block";
    } else {
      arrowUp.current.style.display = "none";
    }
    if (scrollBottom >= 680 || scrollRight >= 70) {
      arrowDown.current.style.display = "block";
    } else {
      arrowDown.current.style.display = "none";
    }
  };
  const scrollToTop = () => {
    imagesSlider.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollToBottom = () => {
    imagesSlider.current.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  };
  const scrollToLeft = () => {
    console.log("clicked");
    imagesSlider.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };
  const scrollToRight = () => {
    console.log("clicked");
    imagesSlider.current.scrollTo({
      left: 540,
      behavior: "smooth",
    });
  };
 
  const handleViewportChange = (event) => {
    setBreakPoint(event.matches);
  };
  const mediaQuery = window.matchMedia("(max-width: 992px)");
  mediaQuery.addEventListener("change", handleViewportChange);



  const handelTab = (index) => {
    setBigImageIndex(index);
  };

  return (
    <div className="single-product-main-content">
      <div className="layout container">
        <div className="single-product-page">
          <div className="left">
            <div className="images-slider">
              <div
                ref={arrowUp}
                className="arrow up"
                onClick={breakPoint ? scrollToLeft : scrollToTop}
              >
                <IoIosArrowUp />
              </div>
              <div
                ref={imagesSlider}
                className="seconds-images"
                onScroll={handleScroll}
              >
                {images?.map((image, index) => (
                  <img
                    key={index}
                    src={"http://127.0.0.1:8000/storage/" + image}
                    alt="product"
                    onClick={() => handelTab(index)}
                  ></img>
                ))}
              </div>
              <div
                ref={arrowDown}
                className="arrow down"
                onClick={breakPoint ? scrollToRight : scrollToBottom}
              >
                <IoIosArrowDown />
              </div>
            </div>
            <div className="main-image">
              <img
                src={"http://127.0.0.1:8000/storage/" + images[bigImageIndex]}
                alt="product"
              />
            </div>
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
        <RelatedProducts productId={id} />
      </div>
    </div>
  );
};

export default SingleProduct;
