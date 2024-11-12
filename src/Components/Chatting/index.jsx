import React, { useEffect, useRef, useState } from "react";
import AvatarImage from "../../assets/avatar.jpg";
import { MicrophoneIcon } from "../../SVG/Microphone";
import { GalleryIcon } from "../../SVG/Gallery";
import { EmojiIcon } from "../../SVG/Emoji";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { formatDistance } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  ref as Ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useAudioRecorder } from "react-audio-voice-recorder";

const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
  const user = useSelector((user) => user.login.loggedIn);
  const [messages, setMessages] = useState("");
  const [progressBar, setProgressBar] = useState();
  const [emojiShow, setEmojiShow] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const db = getDatabase();
  const chooseFile = useRef(null);
  const scrollRef = useRef(null);
  const storage = getStorage();

  const handleSendMessage = () => {
    if (singleFriend?.status === "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiveName: singleFriend.name,
        whoReceiveId: singleFriend.id,
        message: messages,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
      }).then(() => {
        setMessages("");
      });
    }
  };

  // get messages

  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      let singleMessageArray = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().whoSendId &&
            item.val().whoReceiveId === singleFriend?.id) ||
          (user.uid === item.val().whoReceiveId &&
            item.val().whoSendId === singleFriend?.id)
        ) {
          singleMessageArray.push(item.val());
        }
      });
      setAllMessages(singleMessageArray);
    });
  }, [singleFriend?.id]);

  const handleEmojiSelect = ({ emoji }) => {
    setMessages(messages + emoji);
    setEmojiShow(false);
  };

  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0];
    const storageRef = Ref(
      storage,
      `${user.displayName} = sendImageMessage/ ${imgFile}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressBar(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMessage")), {
            whoSendName: user.displayName,
            whoSendId: user.uid,
            whoReceiveName: singleFriend.name,
            whoReceiveId: singleFriend.id,
            message: messages,
            Image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
          }).then(() => {
            setMessages("");
            setProgressBar("");
          });
        });
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, progressBar]);

  const handleSendButton = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // not finish need to see
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    const storageRef = Ref(
      storage,
      `${user.displayName} = sendRecMessage/ ${audio}`
    );
    uploadBytes(storageRef, audio).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    const uploadTask = uploadBytesResumable(storageRef, audio);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressBar(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMessage")), {
            whoSendName: user.displayName,
            whoSendId: user.uid,
            whoReceiveName: singleFriend.name,
            whoReceiveId: singleFriend.id,
            message: messages,
            audio: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}: ${new Date().getMinutes()}`,
          }).then(() => {
            setMessages("");
            setProgressBar("");
          });
        });
      }
    );
  };

  return (
    <>
      <div className="w-[1075px] h-[961px] rounded-[10px] bg-[#FFFFFF] shadow-md">
        <div className="w-full h-[101px] bg-[#F9F9F9] rounded-t-md flex items-center">
          <div className="w-[81px] h-[81px] bg-black rounded-full overflow-hidden ml-[20px]">
            <img src={singleFriend?.profile || AvatarImage} />
          </div>
          <div>
            <h1 className="text-xl font-InterRegular text-[#000000] ml-[14px]">
              {singleFriend?.name || "Please select your friend for chatting"}
            </h1>
          </div>
        </div>
        <div className=" w-full h-[860px] rounded-b-md">
          <div className="w-full h-[754.5px] my-3 overflow-y-auto">
            {singleFriend?.status === "single"
              ? allMessages?.map((item, i) => (
                  <div key={i} ref={scrollRef}>
                    {item.whoSendId === user.uid ? (
                      <div className="w-[60%] ml-auto flex flex-col items-end mt-3">
                        {item.Image ? (
                          <div className="w-[60%] ml-auto mt-3 mr-3 flex flex-col items-end overflow-hidden">
                            <img
                              className="w-full h-full object-cover rounded-md"
                              alt="img"
                              src={item.Image}
                            />
                            <span
                              className=" 
                          mr-3 text-slate-500
                          text-sm
                          font-InterRegular
                          inline-block"
                            >
                              {formatDistance(item.date, new Date(), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        ) : (
                          <>
                            <p className="bg-slate-400 p-2 rounded-md  mr-3 text-xl font-InterRegular inline-block">
                              {item.message}
                            </p>
                            <span
                              className=" 
                          mr-3 text-slate-500
                          text-sm
                          font-InterRegular
                          inline-block"
                            >
                              {formatDistance(item.date, new Date(), {
                                addSuffix: true,
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="w-[60%] mr-auto flex flex-col items-start">
                        {item.Image ? (
                          <div className="w-[60%] mr-auto mt-3 ml-3 overflow-hidden">
                            <img
                              className="w-full h-full object-cover rounded-md"
                              alt="img"
                              src={item.Image}
                            />
                            <span
                              className="
                          ml-3 text-slate-500
                          text-sm
                          font-InterRegular
                          inline-block"
                            >
                              {formatDistance(item.date, new Date(), {
                                addSuffix: true,
                              })}
                            </span>{" "}
                          </div>
                        ) : (
                          <>
                            {" "}
                            <p className="bg-slate-300 p-2 rounded-md  ml-3 mt-3 text-xl font-InterRegular inline-block">
                              {item.message}
                            </p>
                            <span
                              className="
                          ml-3 text-slate-500
                          text-sm
                          font-InterRegular
                          inline-block"
                            >
                              {formatDistance(item.date, new Date(), {
                                addSuffix: true,
                              })}
                            </span>{" "}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              : ""}
            {progressBar && (
              <div className="w-[200px] h-[200px] mx-auto">
                <CircularProgressbar
                  value={progressBar}
                  text={`${progressBar}%`}
                />
              </div>
            )}
            {/* Sender Image */}
            {/* <div className="w-[60%] ml-auto mt-3 mr-3 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-md"
                alt="img"
                src={AvatarImage}
              />
            </div> */}
            {/* Receiver Image */}
            {/* <div className="w-[60%] mr-auto mt-3 ml-3 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-md"
                alt="img"
                src={AvatarImage}
              />
            </div> */}
          </div>

          <div className="w-full h-[105.5px] rounded-b-md">
            <div className="w-[990px] h-[80px]  bg-[#F5F5F5] rounded-md ml-[59px] flex items-center justify-between">
              {/* Icon part */}
              <div className="w-[154px] h-[80px] rounded-b-md ml-[25px] flex items-center">
                <div className="text-[#292D32] mr-[15px] cursor-pointer hover:text-green-500">
                  <div className="relative">
                    <div>
                      <MicrophoneIcon />
                    </div>
                    <div className="absolute top-0 -left-0">
                      <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        downloadOnSavePress={true}
                        downloadFileExtension="webm"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-[#353535] mr-[15px]">
                  <div className="relative">
                    {emojiShow && (
                      <div className="absolute bottom-9 -left-3 ">
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                      </div>
                    )}

                    <div
                      onClick={() => setEmojiShow((prev) => !prev)}
                      className="cursor-pointer hover:text-green-500"
                    >
                      <EmojiIcon />
                    </div>
                  </div>
                </div>
                <div className="text-[#292D32] mr-[15px] cursor-pointer hover:text-green-500">
                  <div onClick={() => chooseFile.current.click()}>
                    <GalleryIcon />
                  </div>
                  <input
                    onChange={handleImageUpload}
                    ref={chooseFile}
                    type="file"
                    hidden
                  />
                </div>
              </div>

              <div className="w-[694px] h-full  rounded-b-md flex items-center justify-start">
                <input
                  className="outline-none w-[664px] h-[60px] rounded-md bg-transparent"
                  placeholder="type here"
                  onChange={(e) => setMessages(e.target.value)}
                  value={messages}
                  onKeyUp={handleSendButton}
                />
              </div>
              <div>
                <button
                  onClick={handleSendMessage}
                  className="w-[134px] h-[54px] bg-[#3E8DEB] rounded-md text-[#FFFFFF] font-InterRegular text-xl mr-[8px]"
                >
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
