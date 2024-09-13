import React from "react";
import AvatarImage from "../../assets/avatar.jpg";

const FriendRequest = () => {
  return (
    <>
      <div flex flex-col-2>
        <div className="ml-[28px] pt-[28px]">
          <h1 className="text-[#494949] font-InterBold text- text-3xl">
            Friend requests
          </h1>
        </div>

        {/* ml -28 to 20 for scrolling issue total box area total width 468 */}
        <div className="ml-[28px] mt-[44px] w-[499px] h-[810px]  overflow-y-auto">
          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>

          <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                  <img src={AvatarImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto
                </h1>
              </div>
            </div>
            <div className="w-[254.68px]">
              <button className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Accept
              </button>
              <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
