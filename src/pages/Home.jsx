import React from "react";
import Userlist from "../Components/UserList";
import FriendRequest from "../Components/FriendRequest";
import MyFriends from "../Components/MyFriends";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-[1fr,4fr]">
        <div>
          <div className="w-[468px] h-[961px] bg-[#ffffff] shadow-md rounded-[10px] mt-[32px] ml-[32px]">
            <div>
              <Userlist toast={toast} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="">
            <div className="w-[555.84px] h-[961px] bg-[#ffffff] shadow-md rounded-[10px] mt-[32px] ml-[32px]">
              <FriendRequest />
            </div>
          </div>
          <div>
            <div className="w-[555.84px] h-[961px] bg-[#ffffff] shadow-md rounded-[10px] mt-[32px] ml-[32px]">
              <MyFriends />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
