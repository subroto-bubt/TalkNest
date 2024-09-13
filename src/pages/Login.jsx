import React from "react";
import LoginFormCom from "../Components/Login";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-[1920px] h-[1024px] bg-[#ffffff] flex items-center justify-center">
          <div className=" flex-col">
            <div className="text-center text-7xl mb-[22px]">
              <h1 className="font-JotiOneRegular">TalkNest</h1>
            </div>
            <div className="w-[613px] h-[675px] bg-white shadow-md rounded-md flex items-center justify-center">
              {/* //Full Name field added for change height 497 to 647*/}
              <div className="w-[474px] h-[430px] bg-white ">
                <LoginFormCom toast={toast} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
