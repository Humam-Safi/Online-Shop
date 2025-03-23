import * as Yup from "yup";

const validationName = /^[a-zA-z]/;
const validateEmail = /^[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
// const validationPassword = /^(?=.*[A-Za-z])(?=.*[\W]).{2,}$/;

export const validationSchema1 = Yup.object().shape({
  name: Yup.string()
    .matches(validationName, "Name is not valid")
    .min(2, "First name must be more than 2 letters")
    .required("Full name is required"),
  email: Yup.string()
    .matches(validateEmail, "Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});