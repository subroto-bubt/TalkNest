import { useFormik } from "formik";
import React, { useState } from "react";
import { signUp } from "../../validation/Validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const RegiCompForm = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPass: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      createNewUser();
    },
    validationSchema: signUp,
  });
  //console.log(formik);

  const createNewUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: formik.values.fullName,
        }).then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              toast.success("Email sent for varification", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              const timeoutId = setTimeout(() => {
                navigate("/login");
              }, 2000);
              setLoading(false);
              return () => clearTimeout(timeoutId);
            })
            .then(() => {
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
              });
            })
            .catch((error) => {
              toast.error(error.message, {
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
        });
        console.log(user);
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("This email already in use", {
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
      });
    // .then((userCredential) => {
    //   // Signed up
    //   const user = userCredential.user;
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
  };

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1">
            <label
              htmlFor="fullName"
              className="font-InterRegular text-lg mb-[18px]"
            >
              Enter Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              className="border border-solid border-[#D8D8D8] rounded-md outline-none w-[474px] h-[62px]"
            />
            <div className="  w-[474px]  h-[30px]">
              {formik.errors.fullName && formik.touched.fullName && (
                <p className="font-InterRegular text-red-500">
                  {formik.errors.fullName}
                </p>
              )}
            </div>
          </div>

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
            <label
              htmlFor="confirmPass"
              className="font-InterRegular text-lg mb-[18px]"
            >
              Enter Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={formik.values.confirmPass}
              onChange={formik.handleChange}
              className="border border-solid border-[#D8D8D8] rounded-md outline-none w-[474px] h-[62px]"
            />
            <div className="  w-[474px]  h-[30px]">
              {formik.errors.confirmPass && formik.touched.confirmPass && (
                <p className="font-InterRegular text-red-500">
                  {formik.errors.confirmPass}
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
              {loading ? <ScaleLoader color="#fff" size={6} /> : "Sign Up"}
            </button>
          </div>
          <div>
            <p className="font-InterRegular text-xl">
              Already have an account please{" "}
              <Link
                to={"/login"}
                className="text-[#236DB0] font-InterRegular text-xl cursor-pointer"
              >
                sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegiCompForm;
