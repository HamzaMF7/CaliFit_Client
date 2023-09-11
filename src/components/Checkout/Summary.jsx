import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";
import {
    LoadingOutlined,
    UpOutlined,
    DownOutlined,
    ShoppingCartOutlined,
    SafetyOutlined,
  } from "@ant-design/icons";

import { baseURL } from '../../utils/api';


const Summary = ({totalPrice , setotalPrice}) => {

    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(null);
    const [couponMsg, setCouponMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const { cartItems, total } = useSelector((state) => state.cart);

    const handleCouponCodeChange = (e) => {
        setCouponCode(e.target.value);
      };
      const handleApplyCoupon = async () => {
        try {
          const response = await axios.post(
            `${baseURL}/api/validate-coupon`,
            { code: couponCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          if (response.status == 200) {
            setDiscount(response.data.discount);
            setCouponMsg("Successfully Applied");
            setSuccess(true);
            setotalPrice((total - total * response.data.discount))
          }
        } catch (error) {
          setCouponMsg(error.response.data.message);
          setSuccess(false);
          setDiscount(0);
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setCouponMsg("");
      };

    const [isExpanded, setIsExpanded] = useState(false);
    const [breakPoint, setBreakPoint] = useState(
      window.matchMedia("(max-width: 768px)").matches
    );
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      const handleViewportChange = (event) => {
        setBreakPoint(event.matches);
      };
  
      mediaQuery.addEventListener("change", handleViewportChange);
  
      return () => {
        mediaQuery.removeEventListener("change", handleViewportChange);
      };
    }, []);
  
    useEffect(() => {
      breakPoint ? setIsExpanded(false) : setIsExpanded(true);
    }, [breakPoint]);
  
    const toggleSummary = () => {
      setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    };

    return (
      <div className={`summary ${isExpanded ? "expanded" : ""}`}>
        <div className="summary-header" onClick={toggleSummary}>
          <div className="title">
            <ShoppingCartOutlined className="ShoppingCartOutlined" />
            <p>{isExpanded ? "Hide" : "Show"} order summary</p>
            <span className="arrow-icon">
              {isExpanded ? <UpOutlined /> : <DownOutlined />}
            </span>
          </div>
          <span>${total}</span>
        </div>
        <div className="items">
          <div className="products">
            {cartItems?.map((item, index) => (
              <div key={index} className="product-details">
                <div className="product-name">
                  <div className="image">
                    <img
                      src={`${baseURL}/storage/` + item.image_url[0]}
                      alt="product"
                    />
                    <span>{item.amountItem}</span>
                  </div>
                  <span className="product-name">{item.title}</span>
                </div>
                <span className="price">${item.price * item.amountItem}</span>
              </div>
            ))}
          </div>
          <div className="coupon">
            <input
              className="discount-code"
              type="text"
              placeholder="Gift card or discount code"
              value={couponCode}
              onChange={handleCouponCodeChange}
            />
            <div className="apply" onClick={handleApplyCoupon}>
              APPLY
            </div>

            {couponMsg !== "" &&
              (success ? (
                <p className="success">
                  {couponMsg}
                  <SafetyOutlined />
                </p>
              ) : (
                <p className="error">{couponMsg} !</p>
              ))}
          </div>
          <div className="subtotal">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="discount">
            <span>Discount</span>
            <span>{discount !== null ? discount * 100 : 0}%</span>
          </div>
          <div className="shipping-cost">
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className="total">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    );
  };
export default Summary