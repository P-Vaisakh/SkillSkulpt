import React, { useContext, useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../Services/allRequests";
import useGetReceiver from "../Hooks/useGetReceiver";
import { userDetailsContext, userTokenContext } from "../Services/AppContext";
import { base } from "../Services/base";
import { IoMdSend } from "react-icons/io";
import ChatComponent from "./ChatComponent";

const ChatBox = ({ userId, currentChat, setSentMessage, receiveMessage }) => {
  const [receiver, setReceiver] = useGetReceiver(currentChat, userId);
  const [messages, setMessages] = useState([]);
  const { token } = useContext(userTokenContext);
  const { userdetails } = useContext(userDetailsContext);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function getConvo() {
      const headers = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };
      let response = await getMessages(currentChat._id, headers);
      setMessages(response.data.result);
    }
    getConvo();
  }, [currentChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = {
      senderId: userdetails._id,
      text: newMessage,
      chatId: currentChat._id,
    };
    const receiverId = receiver._id;
    setSentMessage({ ...msg, receiverId });
    const headers = {
      "Content-Type": "application/json",
      access_token: `Bearer ${token}`,
    };
    try {
      const { data } = await addMessage(msg, headers);
      setMessages([...messages, data.newMessage]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    console.log("msg arrived", receiveMessage);
    if (receiveMessage !== null && receiveMessage.chatId === currentChat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  return (
    <div className="flex flex-col items-start justify-start h-full">
      {receiver == "" ? (
        <p className="text-center text-gray-400 my-8 w-full">
          Tap on a chat to start messaging.
        </p>
      ) : (
        <>
          <div className="flex flex-row items-center justify-start gap-2 py-1 px-2 bg-white w-full  ref={messageContainerRef}">
            <img
              src={`${base}/uploads/${receiver.profilePic}`}
              className="h-8 w-8 rounded-full "
              alt=""
            />
            <h3 className="font-bold">{receiver.userName}</h3>
          </div>
          <ChatComponent
            messages={messages}
            userdetails={userdetails}
          ></ChatComponent>
          <form className="w-full flex bg-[#fefefe]  py-3 items-center justify-center gap-2">
            <input
              value={newMessage}
              type="text"
              className="lg:w-[50%] bg-white rounded-md border-gray-400 px-2 py-1 outline outline-2 h-10 outline-gray-400 "
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-green-500 rounded-md text-white px-4 py-2 h-10"
              onClick={(e) => handleSend(e)}
            >
              <IoMdSend className="text-lg" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBox;
