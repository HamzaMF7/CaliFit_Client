import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.scss"
import { orderFilled } from "../../app/reduxSlice/ChekoutSlice";
import { customerFilled } from "../../app/reduxSlice/CustomerSlice";



const Payment = () => {
  const { shipping } = useSelector((state) => state.checkOut);
  const { total , amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  

  const order = {
    first_name: shipping.firstName,
    last_name: shipping.lastName,
    email: shipping.email,
    phone_number: shipping.phoneNumber,
    products_amount: amount,
    shipping_address: shipping.shippingAddress,
    city: shipping.city,
    total_amount: total,
  };

  const customer = {
    first_name: shipping.firstName,
    last_name: shipping.lastName,
    email: shipping.email,
    phone_number: shipping.phoneNumber,
  }
   
  useEffect(()=>{
    dispatch(orderFilled(order));
    dispatch(customerFilled(customer));
  },[])

  return <div className="table">
    <div className="row1">
      <h5>Contact</h5>
      <span>{shipping.email}</span>
    </div>
    <div className="row2">
      <h5>Ship to</h5>
      <span>{shipping.shippingAddress}</span>
    </div>
  </div>;
};

export default Payment;
