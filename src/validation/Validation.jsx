import * as Yup from "yup";

export const signUp = Yup.object({
  fullName: Yup.string().min(3).max(15).required("Please Enter your Full Name"),
  email: Yup.string().email().required("Please enter your valid email"),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Please enter atleast one special character and a number"
    )
    .required("Enter your password"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .min(8)
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Please enter atleast one special character and a number"
    )
    .required("Enter your confirm password"),
});

export const signIn = Yup.object({
  email: Yup.string().email().required("Please enter your valid email"),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Please enter atleast one special character and a number"
    )
    .required("Enter your password"),
});
