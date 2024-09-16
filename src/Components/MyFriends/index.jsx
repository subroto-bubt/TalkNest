import React, { useEffect, useState } from "react";
import AvatarImage from "../../assets/avatar.jpg";
import { getDatabase, onValue, ref, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const MyFriends = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [friends, setFriends] = useState([]);
  const [block, setBlock] = useState(false);
  const db = getDatabase();

  // Show Request
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().senderId ||
          user.uid === item.val().receiverId
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(frndArr);
    });
  }, [db, user.uid]);

  const handleUnfriend = (data) => {
    remove(ref(db, "friends/" + data.id));
  };

  const handleBlock = (item) => {
    setBlock(!block);
  };

  return (
    <>
      <div flex flex-col-2>
        <div className="ml-[28px] pt-[28px]">
          <h1 className="text-[#494949] font-InterBold text- text-3xl">
            My Friends
          </h1>
        </div>

        {/* ml -28 to 20 for scrolling issue total box area total width 468 */}
        <div className="ml-[28px] mt-[44px] w-[499px] h-[810px]  overflow-y-auto">
          {friends?.map((item) => (
            <div className="w-[491.65px] h-[63.97px] mb-[19.03px] flex items-center justify-between hover:bg-[#efefef] rounded-md transition-all ease-linear duration-100 cursor-pointer">
              <div className="flex items-center">
                <div>
                  <div className="w-[63.97px] h-[63.97px] bg-slate-500 rounded-full overflow-hidden">
                    {user.uid === item.senderId ? (
                      <img src={item.receiverProfile || AvatarImage} />
                    ) : (
                      <img src={item.senderProfile || AvatarImage} />
                    )}
                    <img src={AvatarImage} />
                  </div>
                </div>
                <div>
                  <h1 className="text-[#3D3C3C] font-InterRegular text-[23px] ml-[13px]">
                    {user.uid === item.senderId
                      ? item.receiverName
                      : item.senderName}
                  </h1>
                </div>
              </div>
              <div className="w-[254.68px]">
                <button
                  className="w-[123.68px] h-[41.23px] bg-[#4A81D3] mr-[7.32px] text-sm font-InterRegular text-[#FFFFFF] rounded-md"
                  onClick={() => handleUnfriend(item)}
                >
                  Unfriend
                </button>
                {block ? (
                  <button
                    className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md"
                    onClick={() => handleBlock(item)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="w-[123.68px] h-[41.23px] bg-[#D34A4A] text-sm font-InterRegular text-[#FFFFFF] rounded-md"
                    onClick={() => handleBlock(item)}
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyFriends;
