import React from "react";
import AvaterImage from "../../assets/avatar.jpg";
import { UserAddIcon } from "../../SVG/UserAdd";

const Userlist = () => {
  return (
    <>
      <div flex flex-col-3>
        <div className="ml-[28px] pt-[28px]">
          <h1 className="text-[#494949] font-InterBold text- text-3xl">
            All Users
          </h1>
        </div>
        <div className="">
          <div className="w-[409px] h-[66px] bg-[#F8F8F8] rounded-xl ml-[29px] mt-[34px]">
            <input
              placeholder="Search Users..."
              className="w-[369px] text-[23px] font-InterRegular bg-[#F8F8F8] outline-none ml-[20px] mt-[19px]"
            />
          </div>
        </div>
        {/* ml -28 to 20 for scrolling issue total box area total width 468 */}
        <div className="ml-[20px] mt-[44px] w-[438px] h-[730px]  overflow-y-auto">
          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>

          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>

          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>

          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>

          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>

          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>

          <div className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                  <img src={AvaterImage} />
                </div>
              </div>
              <div>
                <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                  Subroto Kumar Sarker
                </h1>
              </div>
            </div>
            <div className="text-[#292D32]">
              <UserAddIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
