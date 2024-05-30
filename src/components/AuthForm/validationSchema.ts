import * as yup from "yup";

export const validationSchemaSignup = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must contain 3 or more characters")
    .max(20, "Name must contain 3 or more characters")
    .required("A name is required"),
  email: yup
    .string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please enter valid email. Example: user@mail.com"
    )
    .required("An email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "The password must consist of 6 English letters and 1 number"
    )
    .required("A password is required"),
});

export const validationSchemaSignin = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please enter valid email. Example: user@mail.com"
    )
    .required("An email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "The password must consist of 6 English letters and 1 number"
    )
    .required("A password is required"),
});
