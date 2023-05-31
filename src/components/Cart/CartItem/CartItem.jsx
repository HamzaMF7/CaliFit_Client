import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  increase,
  removeItem,
} from "../../../app/reduxSlice/CartSlice";
const CartItem = () => {
  const { amount, cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div className="search-result-item" key={item.id} onClick={() => {}}>
          <div className="image-container">
            <img
              src={"http://127.0.0.1:8000/storage/" + item?.image_url}
            />
          </div>
          <div className="prod-details">
            <span className="name">{item.title}</span>
            <MdClose
              className="close-btn"
              onClick={() => dispatch(removeItem(item.id))}
            />
            <div className="quantity-buttons">
              <span
                onClick={() => {
                  item.amountItem <= 1
                    ? dispatch(removeItem(item.id))
                    : dispatch(decrease(item.id));
                }}
              >
                -
              </span>
              <span>{item.amountItem}</span>
              <span onClick={() => dispatch(increase(item.id))}>+</span>
            </div>
            <div className="text">
              {/* <span>{item.amountItem}</span>
              <span>x</span> */}
              <span className="highlight">
                {item.price * item.amountItem}
                <span>MAD</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
