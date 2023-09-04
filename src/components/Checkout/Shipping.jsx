import React from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
// import AddressForm from "./AddressForm";

const Shipping = ({ values, touched, errors, handleChange, handleBlur }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box>
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: "30px" }} fontSize="18px">
          Billing Information
        </Typography>
        <Box
          display="grid"
          gap="15px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div":  { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            name="firstName"
            type="text"
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            sx={{ gridColumn: "span 4" }}
          />
          {touched.firstName && errors.firstName && (
            <p className="input-error"> {errors.firstName} !</p>
          )}
          <TextField
            fullWidth
            name="lastName"
            type="text"
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            sx={{ gridColumn: "span 4" }}
          />
          {touched.lastName && errors.lastName && (
            <p className="input-error"> {errors.lastName} !</p>
          )}
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            sx={{ gridColumn: "span 4" }}
          />
          {touched.email && errors.email && (
            <p className="input-error"> {errors.email} !</p>
          )}
          <TextField
            fullWidth
            name="shippingAddress"
            type="text"
            label="Shipping Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.shippingAddress}
            sx={{ gridColumn: "span 4" }}
          />
          {touched.shippingAddress && errors.shippingAddress && (
            <p className="input-error"> {errors.shippingAddress} !</p>
          )}
          <TextField
            fullWidth
            name="city"
            type="text"
            label="City"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            sx={{ gridColumn: "span 4" }}
          />
          {touched.city && errors.city && (
            <p className="input-error"> {errors.city} !</p>
          )}
          <TextField
            fullWidth
            name="phoneNumber"
            type="text"
            label="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            sx={{ gridColumn: "span 4" }}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <p className="input-error"> {errors.phoneNumber} !</p>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;

// {/* SHIPPING FORM */}
// {!values.shippingAddress.isSameAddress && (
//   <Box>
//     <Typography sx={{ mb: "15px" }} fontSize="18px">
//       Shipping Information
//     </Typography>
//     <AddressForm
//       type="shippingAddress"
//       values={values.shippingAddress}
//       touched={touched}
//       errors={errors}
//       handleBlur={handleBlur}
//       handleChange={handleChange}
//     />
//   </Box>
// )}

//   <Box mb="20px">
//   <FormControlLabel
//     control={
//       <Checkbox
//         defaultChecked
//         value={values.shippingAddress.isSameAddress}
//         onChange={() =>
//           setFieldValue(
//             "shippingAddress.isSameAddress",
//             !values.shippingAddress.isSameAddress
//           )
//         }
//       />
//     }
//     label="Same for Shipping Address"
//   />
// </Box>
