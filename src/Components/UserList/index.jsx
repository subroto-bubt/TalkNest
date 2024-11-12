import React, { useEffect, useState } from "react";
import AvaterImage from "../../assets/avatar.jpg";
import { UserAddIcon } from "../../SVG/UserAdd";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";

const Userlist = ({ toast }) => {
  const user = useSelector((user) => user.login.loggedIn);
  const [users, setUsers] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [cancelReq, setCancelReq] = useState([]);
  const db = getDatabase();
  const storage = getStorage();

  // Show User List
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const users = [];
      snapshot.forEach((usersList) => {
        if (user.uid !== usersList.key) {
          getDownloadURL(Ref(storage, usersList.key))
            .then((downloadURL) => {
              users.push({
                ...usersList.val(),
                id: usersList.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...usersList.val(),
                id: usersList.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  //Send Friend Request Handaler

  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest")), {
      senderName: user.displayName,
      senderId: user.uid,
      senderProfile: user.photoURL ?? "/src/assets/avatar.jpg",

      receiverName: data.username,
      receiverId: data.id,
      receiverProfile: data.photoURL ?? "/src/assets/avatar.jpg",
    });
    toast.success("Friend request send Successful", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Show Friend Request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let cancelReq = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().senderId);
        cancelReq.push({ ...item.val(), id: item.key });
      });

      setFriendRequestList(reqArr);
      setCancelReq(cancelReq);
    });
  }, [db]);

  const handleCancelReq = (itemId) => {
    const reqToCancel = cancelReq.find(
      (req) => req?.receiverId === itemId && req?.senderId === user.uid
    );

    if (reqToCancel) {
      remove(ref(db, "friendRequest/" + reqToCancel.id));
    }
  };

  // Show Friends
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let frndReq = [];
      let frndlnCount = 0;
      snapshot.forEach((item) => {
        if (
          user.uid === item.val()?.receiverId ||
          user.uid === item.val()?.senderId
        ) {
          frndReq.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(frndReq);
    });
  }, [db, user.uid]);

  const friendCount = friends.length;
  console.log(friendCount);
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
          {/* Start of User List */}
          {users?.map((item, i) => (
            <div
              className="w-[410px] h-[82px] mb-[10px] flex items-center justify-between"
              key={i}
            >
              {/* <div>{console.log(friends.includes(item.id))}</div> */}
              <div className="flex items-center">
                <div>
                  <div className="w-[82px] h-[82px] rounded-full overflow-hidden">
                    <img src={item?.photoURL || AvaterImage} />
                  </div>
                </div>
                <div>
                  <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                    {item?.username}
                  </h1>
                </div>
              </div>

              {friendRequestList.includes(item?.id + user.uid) ? (
                <button
                  className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md"
                  onClick={() => handleCancelReq(item.id)}
                >
                  Cancel Request
                </button>
              ) : friendRequestList.includes(user.uid + item.id) ? (
                <button className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                  Panding Request
                </button>
              ) : friends.includes(item.id) ? (
                <button className="w-[123.68px] h-[41.23px] bg-[#3E8DEB] text-sm font-InterRegular text-[#FFFFFF] rounded-md">
                  Friend
                </button>
              ) : (
                <div
                  className="text-[#292D32] cursor-pointer"
                  onClick={() => handleFriendRequest(item)}
                >
                  <UserAddIcon />
                </div>
              )}
            </div>
          ))}

          {/* End of user list */}
        </div>
      </div>
    </>
  );
};

export default Userlist;
