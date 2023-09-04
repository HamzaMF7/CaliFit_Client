import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  decrease,
  increase,
  removeItem,
  startLoading,
  stopLoading,
} from "../../../app/reduxSlice/CartSlice";
import axios from "axios";
import { baseURL } from "../../../utils/api";

const CartItem = () => {
  const { cartItems, loadingItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = async (productId, value) => {
    try {
      setIsLoading(true)
      dispatch(startLoading({ itemId: productId })); // Start loading for the item
      const response = await axios.put(
        `${baseURL}/api/product/update-quantity/${productId}`,
        { itemAmount: value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      dispatch(stopLoading({ itemId: productId })); // Stop loading for the item
      setIsLoading(false)
    }
  };
  console.log(isLoading);

  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div className="search-result-item" key={item.id} onClick={() => {}}>
          <div className="image-container">
            {loadingItems[item.id] && (
              <div className="overLay">
                <LoadingOutlined />
              </div>
            )}
            <img src={baseURL + "/storage/" + item?.image_url[0]} />
          </div>
          <div className="prod-details">
            <div className="name-price">
              <span className="name">{item.title}</span>
              <span className="highlight">
                {item.price * item.amountItem}
                <span>DH</span>
              </span>
            </div>
            <div className="quantity">
              <div className="quantity-buttons">
                <button
                  onClick={() => {
                    if (item.amountItem <= 1) {
                      dispatch(removeItem(item.id));
                    } else {
                      dispatch(decrease(item.id));
                      updateQuantity(item.id, item.amountItem - 1);
                    }
                  }}
                >
                  -
                </button>
                <span className="amount-item">{item.amountItem}</span>
                <button
                  onClick={() => {
                    dispatch(increase(item.id));
                    updateQuantity(item.id, item.amountItem + 1);
                  }}
                  disabled={item.amountItem >= 30 || isLoading ? true : false}
                >
                  +
                </button>
              </div>
              <div
                className="close-btn"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Remove
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
