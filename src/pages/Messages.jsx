import React from "react";
import MyFriends from "../Components/MyFriends";
import Chatting from "../Components/Chatting";

const Messages = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[1661px] h-[961px] my-[31.5px] flex justify-between">
          <div className="w-[555.84px] h-[961px] rounded-[10px] bg-[#FFFFFF] shadow-md">
            <MyFriends />
          </div>
          <div>
            <Chatting />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
