import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="w-full h-screen bg-black flex items-center justify-center ">
        <div className="flex items-center justify-center">
          <div className="flex">
            <Navbar />

            <div className="w-[1754px] h-[1024px] bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
