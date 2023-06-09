import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { shades } from "../../utils/theme";
import {
  createOrder,
  resetState,
  submitInfo,
} from "../../app/reduxSlice/ChekoutSlice";
import { Alert, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

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
  const { shipping, order, isSuccess, isLoading } = useSelector(
    (state) => state.checkOut
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const buttonRef = useRef(null); // Create a ref for the button

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    const payload = values;
    console.log(payload);
    dispatch(submitInfo(payload));
  };

  const submitOrder = async () => {
    if (buttonRef.current.innerText === "PLACE ORDER") {
      try {
        dispatch(createOrder(order));
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

//  reset to initialeState of order when location change
  const location = useLocation();
  useEffect(() => {
    if (isSuccess) dispatch(resetState());
  }, [location]);

  useEffect(() => {
    console.log(isSuccess);
  }, []);

  return (
    <Box width="80%" m="100px auto">
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
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}
              {isSecondStep && <Payment />}
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
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={isSuccess ? true : false}
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                {activeStep < 2 && (
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    ref={buttonRef}
                    sx={{
                      backgroundColor: shades.primary[400],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={submitOrder}
                  >
                    {!isSecondStep ? "Next" : "Place Order"}
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
