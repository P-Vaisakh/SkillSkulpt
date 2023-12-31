import React, { useEffect, useState } from "react";
import { getUser } from "../Services/allRequests";
import { base } from "../Services/base";
import useGetReceiver from "../Hooks/useGetReceiver";

const Conversation = ({ item, userId, onlineUsers }) => {
  const [receiver, setReceiver] = useGetReceiver(item, userId);

  return (
    <div className="flex lg:flex-row flex-col justify-start items-center lg:gap-3 transition-all duration-300 hover:bg-gray-200 rounded-md lg:px-4 lg:py-2 cursor-pointer">
      <img
        src={`${base}/uploads/${receiver.profilePic}`}
        className={`object-contain border ${onlineUsers.includes(receiver._id)?"border border-green-500 border-spacing-4":"border-main"} rounded-full h-9 w-9`}
        alt=""
      />
      <h3 className="text-main text-xs lg:text-lg lg:font-bold">{receiver.userName}</h3>
    </div>
  );
};

export default Conversation;
