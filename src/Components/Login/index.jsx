import { useFormik } from "formik";
import React, { useState } from "react";
import { signIn } from "../../validation/Validation";
import { ScaleLoader } from "react-spinners";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LoggedInUser } from "../../features/slices/LoginSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginFormCom = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      signInUser();
    },
    validationSchema: signIn,
  });

  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        // Signed in
        if (user.emailVerified === true) {
          dispatch(LoggedInUser(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
          setLoading(false);
        } else {
          toast.error("Please verify your email", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error("Email or Password don't match", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1">
            <label
              htmlFor="email"
              className="font-InterRegular text-lg mb-[18px]"
            >
              Enter Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="border border-solid border-[#D8D8D8] rounded-md outline-none w-[474px] h-[62px]"
            />
            <div className="  w-[474px]  h-[30px]">
              {formik.errors.email && formik.touched.email && (
                <p className="font-InterRegular text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <label
              htmlFor="password"
              className="font-InterRegular text-lg mb-[18px]"
            >
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="border border-solid border-[#D8D8D8] rounded-md outline-none w-[474px] h-[62px]"
            />
            <div className="  w-[474px]  h-[30px]">
              {formik.errors.password && formik.touched.password && (
                <p className="font-InterRegular text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1">
            <button
              disabled={loading}
              type="submit"
              className="rounded-md w-[474px] h-[62px] mb-[30px] bg-[#313131] text-white"
            >
              {loading ? <ScaleLoader color="#fff" size={6} /> : "Sign In"}
            </button>
          </div>
          <div>
            <p className="font-InterRegular text-xl text-[#4A4A4A] underline underline-offset-[5px] mb-[30px]">
              forgot password?
            </p>
          </div>
          <div>
            <p className="font-InterRegular text-xl">
              Don’t have an account please{" "}
              <Link
                to={"/registration"}
                className="text-[#236DB0] font-InterRegular text-xl cursor-pointer"
              >
                sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginFormCom;
