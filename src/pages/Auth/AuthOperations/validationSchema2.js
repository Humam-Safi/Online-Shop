import * as Yup from "yup";

const validateEmail = /^[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

export const validationSchema2 = Yup.object().shape({
  email: Yup.string()
    .matches(validateEmail, "Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});