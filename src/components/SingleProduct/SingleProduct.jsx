import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
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
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  getProducts,
  getSingleProduct,
} from "../../app/reduxSlice/ProductSlice";
import { addToCart } from "../../app/reduxSlice/CartSlice";
import { baseURL } from "../../utils/api";

const SingleProduct = () => {
  const { id } = useParams();
  const imagesSlider = useRef(null);
  const arrowUp = useRef(null);
  const arrowDown = useRef(null);
  const [bigImageIndex, setBigImageIndex] = useState(0);
  const [breakPoint, setBreakPoint] = useState(
    window.matchMedia("(max-width: 992px)").matches
  );

  const dispatch = useDispatch();
  const { singleProduct, products } = useSelector((state) => state.product);

  const images = singleProduct[0]?.image_url;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 992px)");
    const handleViewportChange = (event) => {
      setBreakPoint(event.matches);
    };

    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (products.length <= 0) {
      dispatch(getProducts()).then(() => dispatch(getSingleProduct(id)));
    } else {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id, products.length]);

  useEffect(() => {
    if (imagesSlider.current) {
      const clientHeight = imagesSlider.current.clientHeight;
      const scrollHeight = imagesSlider.current.scrollHeight;

      if (scrollHeight <= clientHeight) {
        arrowUp.current.style.display = "none";
        arrowDown.current.style.display = "none";
      }
    }
  }, [images]);

  const handleScroll = () => {
    const scrollHeight = imagesSlider.current.scrollHeight;
    const clientHeight = imagesSlider.current.clientHeight;

    // for desktop
    const scrollTop = imagesSlider.current.scrollTop;
    const scrollBottom = scrollHeight - scrollTop;
    // for mobile
    const scrollLeft = imagesSlider.current.scrollLeft;
    const scrollRight =
      imagesSlider.current.scrollWidth -
      imagesSlider.current.clientWidth -
      scrollLeft;

    // console.log("scroll height :" ,scrollHeight );
    // console.log("client  height:" ,clientHeight );

    console.log(scrollTop);

    arrowUp.current.style.display =
      scrollTop >= 70 || scrollLeft >= 70 ? "block" : "none";
    arrowDown.current.style.display =
      scrollBottom >= 680 || scrollRight >= 70 ? "block" : "none";
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
    imagesSlider.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollToRight = () => {
    imagesSlider.current.scrollTo({
      left: 540,
      behavior: "smooth",
    });
  };

  const handelTab = (index) => {
    setBigImageIndex(index);
  };

  if (singleProduct.length <= 0) {
    return (
      <Spin tip="Loading..." size="large">
        <div className="content" />
      </Spin>
    );
  }

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
                    src={`${baseURL}/storage/`+ image}
                    alt="product"
                    onClick={() => handelTab(index)}
                  />
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
                src={`${baseURL}/storage/`+ images[bigImageIndex]}
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
                disabled={singleProduct[0]?.quantity <= 0 ? true : false}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                <span>title</span>
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
