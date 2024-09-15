import React, { useState } from "react";
import { CrossIcon } from "../../SVG/Cross";
import { Cropper } from "react-cropper";
import { ScaleLoader } from "react-spinners";

const ImageCropper = ({
  setImage,
  cropperRef,
  image,
  getCropData,
  loading,
}) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#e8edf3a3] flex items-center justify-center">
        <div className="w-[30%] rounded-md bg-white p-4 relative">
          <div className="">
            <h3 className="font-InterRegular text-base text-black text-center">
              Upload Photo
            </h3>
            <div
              className=" absolute top-2 right-2 cursor-pointer"
              onClick={() => setImage()}
            >
              <CrossIcon />
            </div>
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
              <div
                className="img-preview"
                style={{ width: "100%", float: "left", height: "300px" }}
              />
            </div>
            <div className="mt-5">
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            </div>
            <button
              className="w-full h-[54px] bg-[#3E8DEB] rounded-md text-[#FFFFFF] font-InterRegular text-xl mr-[8px] mt-3"
              onClick={getCropData}
            >
              {loading ? <ScaleLoader color="#fff" size={6} /> : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
