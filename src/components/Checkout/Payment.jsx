import React, { useEffect } from "react";
import "./Checkout.scss";

const Payment = ({shipping}) => {   

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





