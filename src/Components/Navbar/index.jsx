import React, { useState } from "react";
import { HomeIcon } from "../../SVG/Home";
import { MessagesIcon } from "../../SVG/Messages";
import { BackIcon } from "../../SVG/Back";
import { UploadIcon } from "../../SVG/Upload";
import AvaterImage from "../../assets/avatar.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { LogeOutUser } from "../../features/slices/LoginSlice";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import Modals from "../Modals";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("user");
        dispatch(LogeOutUser());
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <>
      <div>
        <div className="w-[166px] h-[1024px] bg-[#5E3493] flex flex-col items-center justify-between relative">
          {location.pathname == "/" ? (
            <div className="absolute w-[6px] h-[75px] bg-white top-[412px] left-[160px]"></div>
          ) : (
            <div className="absolute w-[6px] h-[75px] bg-white top-[534px] left-[160px]"></div>
          )}
          <div className="w-[166px] h-[176px]">
            <div className="flex flex-col items-center ">
              <div className="w-[106px] h-[106px] bg-yellow-400 overflow-hidden rounded-full mt-[24px] relative">
                <img src={AvaterImage} />
              </div>
              <div
                className="absolute top-[65px] left-[71px] text-white cursor-pointer"
                onClick={() => setShow(true)}
              >
                <UploadIcon />
              </div>
              <div className="text-white font-InterRegular text-xl mt-[15px]">
                <span>Subroto</span>
              </div>
            </div>
          </div>
          <div className="w-[166px] h-[176px]">
            <div className="flex flex-col items-center">
              <div className="text-white hover:text-green-500">
                <Link to="/">
                  <HomeIcon />
                </Link>
              </div>
              <div className="text-white mt-[70px] hover:text-green-500">
                <Link to="/messages">
                  <MessagesIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-[166px] h-[176px]">
            <div
              onClick={handleLogout}
              className="flex flex-row items-center justify-center cursor-pointer"
            >
              <div className="text-white mt-[85px] hover:text-green-500">
                <BackIcon />
              </div>
              <div className="text-white ml-[14px] mt-[85px] hover:text-green-500">
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && createPortal(<Modals setShow={setShow} />, document.body)}
    </>
  );
};

export default Navbar;
