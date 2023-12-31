import React, { useContext, useEffect, useRef, useState } from "react";
import { userDetailsContext, userTokenContext } from "../Services/AppContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, getUserChats } from "../Services/allRequests";
import Conversation from "../Components/Conversation";
import ChatBox from "../Components/ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  const { token } = useContext(userTokenContext);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [sentMessage, setSentMessage] = useState(null);
  const [receiveMessage, setreceiveMessage] = useState(null);
  const socket = useRef();

  const { userdetails } = useContext(userDetailsContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getChats = async () => {
    const headers = {
      "Content-Type": "application/json",
      access_token: `Bearer ${token}`,
    };
    let response = await getUserChats(userdetails._id, headers);
    setChats(response.data);
  };

  useEffect(() => {
    getChats();
  }, [userdetails]);

  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.emit("new-user-add", userdetails._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userdetails]);

  useEffect(() => {
    if (sentMessage !== null) {
      socket.current.emit("send-message", sentMessage);
    }
  }, [sentMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setreceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen container flex items-center justify-start">
      <div className="pb-10 pt-16 lg:pt-[70px] lg:px-4 ps-2 text-black bg-white min-h-screen w-16 lg:w-72 border border-r-gray-300">
        <h3 className="text-main font-bold text-lg lg:text-2xl">Chats</h3>
        <hr className="border border-gray-200 mt-1 hidden lg:flex" />
        <div className="flex flex-col items-stretch justify-center gap-1 pe-2 mt-2">
          {chats?.map((item, index) => (
            <div key={index} className="" onClick={() => setCurrentChat(item)}>
              <Conversation
                item={item}
                userId={userdetails._id}
                onlineUsers={onlineUsers}
              ></Conversation>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-200 h-screen flex-1 text-black pt-16">
        <ChatBox
          userId={userdetails._id}
          currentChat={currentChat}
          setSentMessage={setSentMessage}
          receiveMessage={receiveMessage}
        ></ChatBox>
      </div>
      <ToastContainer zIndex={99999999} />
    </div>
  );
};

export default Chat;
