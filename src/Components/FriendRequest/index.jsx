import React, { useEffect, useState } from "react";
import AvatarImage from "../../assets/avatar.jpg";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const db = getDatabase();

  // Show Request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let frndReq = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().receiverId) {
          frndReq.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequestList(frndReq);
    });
  }, [db, user.uid]);

  // Accept Request

  const handleAccept = (data) => {
    console.log(data);
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      console.log("success");
      remove(ref(db, "friendRequest/" + data.id));
    });
  };

  // Reject Request
  const handleReject = (data) => {
    remove(ref(db, "friendRequest/" + data.id));
  };

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
          {/* Start */}

          {friendRequestList?.map((item) => (
            <div
              className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between"
              key={item.id}
            >
              <div className="flex items-center">
                <div>
                  <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                    <img src={item.senderProfile || AvatarImage} />
                  </div>
                </div>
                <div>
                  <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                    {item.senderName}
                  </h1>
                </div>
              </div>
              <div className="w-[254.68px]">
                <button
                  className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md"
                  onClick={() => handleAccept(item)}
                >
                  Accept
                </button>
                <button
                  className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md"
                  onClick={() => handleReject(item)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          {/* end */}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
