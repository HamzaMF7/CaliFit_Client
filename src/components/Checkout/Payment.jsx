import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.scss"
import { orderFilled } from "../../app/reduxSlice/ChekoutSlice";
import { customerFilled } from "../../app/reduxSlice/CustomerSlice";



const Payment = ({shipping}) => {

  // const customer = {
  //   first_name: shipping.firstName,
  //   last_name: shipping.lastName,
  //   email: shipping.email,
  //   phone_number: shipping.phoneNumber,
  // }
   

  return <div className="table">
    <div className="row1">
      <h5>Contact</h5>
      <span>{shipping.email}</span>
    </div>
    <div className="row2">
      <h5>Ship to</h5>
      <span>{shipping.shipping_address}</span>
    </div>
  </div>;
};

export default Payment;





