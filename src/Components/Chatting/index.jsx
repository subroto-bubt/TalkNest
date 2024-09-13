import React from "react";
import AvatarImage from "../../assets/avatar.jpg";
import { MicrophoneIcon } from "../../SVG/Microphone";
import { GalleryIcon } from "../../SVG/Gallery";
import { EmojiIcon } from "../../SVG/Emoji";

const Chatting = () => {
  return (
    <>
      <div className="w-[1075px] h-[961px] rounded-[10px] bg-[#FFFFFF] shadow-md">
        <div className="w-full h-[101px] bg-[#F9F9F9] rounded-t-md flex items-center">
          <div className="w-[81px] h-[81px] bg-black rounded-full overflow-hidden ml-[20px]">
            <img src={AvatarImage} />
          </div>
          <div>
            <h1 className="text-xl font-InterRegular text-[#000000] ml-[14px]">
              Subroto Kumar Sarker
            </h1>
          </div>
        </div>
        <div className=" w-full h-[860px] rounded-b-md">
          <div className="w-full h-[754.5px]"></div>
          <div className="w-full h-[105.5px] rounded-b-md">
            <div className="w-[990px] h-[80px]  bg-[#F5F5F5] rounded-md ml-[59px] flex items-center justify-between">
              {/* Icon part */}
              <div className="w-[154px] h-[80px] rounded-b-md ml-[25px] flex items-center">
                <div className="text-[#292D32] mr-[15px]">
                  <MicrophoneIcon />
                </div>
                <div className="text-[#353535] mr-[15px]">
                  <EmojiIcon />
                </div>
                <div className="text-[#292D32] mr-[15px]">
                  <GalleryIcon />
                </div>
              </div>
              <div className="w-[694px] h-full  rounded-b-md flex items-center justify-start">
                <input
                  className="outline-none w-[664px] h-[60px] rounded-md bg-transparent"
                  placeholder="type here"
                />
              </div>
              <div>
                <button className="w-[134px] h-[54px] bg-[#3E8DEB] rounded-md text-[#FFFFFF] font-InterRegular text-xl mr-[8px]">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
