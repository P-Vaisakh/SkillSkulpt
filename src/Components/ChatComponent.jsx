import React, { useEffect, useRef } from "react";
import { format } from "timeago.js";

const ChatComponent = ({ messages, userdetails }) => {
  const chatContainerRef = useRef(null);

  const scrollToNewest = () => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the container
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToNewest();
  }, [messages]);

  return (
    <div
      className={`flex-1 flex flex-col items-center px-4 py-2 w-full gap-2 overflow-y-scroll lg:px-14`}
      ref={chatContainerRef}
    >
      {messages.map((i, index) => (
        <div
          key={index}
          className={`bg-white min-w-[30%] px-3 py-1 rounded-xl border-r-0 ${
            i?.senderId === userdetails._id
              ? "self-end rounded-ee-none"
              : "self-start rounded-bl-none"
          }`}
        >
          <span>{i?.text}</span>
          <br />
          <span className="text-gray-400 text-xs ">{format(i?.createdAt)}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
