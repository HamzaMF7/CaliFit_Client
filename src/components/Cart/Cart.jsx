import React, { useContext, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

import "./Cart.scss";
import { calculateTotals, closeCart } from "../../app/reduxSlice/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { amount, cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => dispatch(closeCart())}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => dispatch(closeCart())}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button
              className="return-cta"
              onClick={() => dispatch(closeCart())}
            >
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">{total} MAD</span>
              </div>
              <div className="button">
                <button
                  className="checkout-cta"
                  onClick={() => {
                    navigate("/checkout");
                    dispatch(closeCart());
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
