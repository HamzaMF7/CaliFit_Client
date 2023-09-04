import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Summary from "./Summary";

//icons and material
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Alert, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Formik } from "formik";
import * as yup from "yup";

// Import components as needed
import Shipping from "./Shipping";
import Payment from "./Payment";

// Import actions as needed
import {
  createOrder,
  resetState,
  submitInfo,
} from "../../app/reduxSlice/ChekoutSlice";
import {
  createCustomer,
  resetCustomer,
} from "../../app/reduxSlice/CustomerSlice";

// Validation schema
const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  city: yup.string().required("required"),
  shippingAddress: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  shippingAddress: "",
  phoneNumber: "",
};

const Checkout = () => {
  const { isSuccess, isLoading } = useSelector((state) => state.checkOut);

  const [ordersDetails, setOrdersDetails] = useState({});
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState({});
  const [customer, setCustomer] = useState({});

  const { cartItems, total } = useSelector((state) => state.cart);
  const [totalPrice, setotalPrice] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const buttonRef = useRef(null); // Create a ref for the button

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setItems(
      cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.title,
        price: item.price,
        quantity: item.amountItem,
        total_price: item.price * item.amountItem,
        order_id: "",
      }))
    );
  }, [cartItems]);

  useEffect(() => {
    setotalPrice(total);
  }, [total]);

  const handleFormSubmit = async (values) => {
    setActiveStep(activeStep + 1);
    setOrdersDetails({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
      shipping_address: values.shippingAddress,
      city: values.city,
      order_id: "",
    });
    setShipping({
      email: values.email,
      shipping_address: values.shippingAddress,
    });
    setCustomer({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_number: values.phoneNumber,
    });
  };

  const submitOrder = async () => {
    if (buttonRef.current.innerText === "PLACE ORDER") {
      const orderData = {
        total_price: totalPrice,
        status: "",
        items: items,
        ...ordersDetails,
      };
      console.log(orderData);
      try {
        dispatch(createOrder(orderData));
        //create customer
        dispatch(createCustomer(customer));
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

  //  reset to initialeState of order when location change
  const location = useLocation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetState());
      //reset the state of customerSlice
      dispatch(resetCustomer());
    }
  }, [location]);

  return (
    <div className="checkout ">
      <div className="container">
        <Box>
          <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
            <Step>
              <StepLabel>Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Shipping</StepLabel>
            </Step>
          </Stepper>
          <Box>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              // validationSchema={checkoutSchema[activeStep]}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  {isFirstStep && (
                    <div className="info">
                      <div className="shipping">
                        <Shipping
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                        <Button
                          className="form-buttons"
                          fullWidth
                          type="submit"
                          color="primary"
                          variant="contained"
                          ref={buttonRef}
                          sx={{
                            boxShadow: "none",
                            color: "white",
                            borderRadius: "5px",
                            padding: "15px 40px",
                            marginTop: "110px",
                          }}
                          onClick={submitOrder}
                        >
                          Next
                        </Button>
                      </div>
                      <Summary
                        totalPrice={totalPrice}
                        setotalPrice={setotalPrice}
                      />
                    </div>
                  )}
                  {isSecondStep && <Payment shipping={shipping} />}
                  {isLoading && (
                    <Spin
                      indicator={antIcon}
                      style={{ width: "100%", margin: "100px 0" }}
                    />
                  )}
                  {isSuccess && (
                    <Space
                      direction="vertical"
                      style={{ width: "100%", margin: "100px 0" }}
                    >
                      <Alert
                        message="Success order"
                        description="Your order has been successfully completed"
                        type="success"
                        showIcon
                      />
                    </Space>
                  )}
                  <Box display="flex" justifyContent="space-between" gap="50px">
                    {!isFirstStep && (
                      <Button
                        className="form-buttons"
                        fullWidth
                        color="primary"
                        variant="contained"
                        disabled={isSuccess ? true : false}
                        sx={{
                          boxShadow: "none",
                          color: "white",
                          borderRadius: "5px",
                          padding: "15px 40px",
                        }}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep < 2 && isSecondStep && (
                      <Button
                        className="form-buttons"
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        ref={buttonRef}
                        sx={{
                          boxShadow: "none",
                          color: "white",
                          borderRadius: "5px",
                          padding: "15px 40px",
                        }}
                        onClick={submitOrder}
                      >
                        {/* {!isSecondStep ? "Next" : "Place Order"} */}
                        Place Order
                      </Button>
                    )}
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Checkout;
