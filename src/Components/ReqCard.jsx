import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { base } from "../Services/base";
import {
  indicatorContext,
  userDetailsContext,
  userTokenContext,
} from "../Services/AppContext";
import { createChat, deleteRequest } from "../Services/allRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const ReqCard = ({ isOwnerUser, post }) => {
  const { token } = useContext(userTokenContext);
  const { setIndicator } = useContext(indicatorContext);
  const { userdetails } = useContext(userDetailsContext);
  const navigate = useNavigate();

  const deletePost = async (id) => {
    const reqHeader = {
      "Content-type": "application/json",
      access_token: `Bearer ${token}`,
    };
    const response = await deleteRequest(id, reqHeader);
    if (response.data.result.deletedCount) {
      setIndicator(response.data.result.deletedCount);
      toast.success("Request deleted succesfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const createNewChat = async (id) => {
    const body = {
      senderId: userdetails._id,
      receiverId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      access_token: `Bearer ${token}`,
    };
    let response = await createChat(body, headers);
    if (response.status) {
      navigate("/chats");
    }
  };

  return (
    <div className="card bg-main rounded-lg py-4 px-5 max-w-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="badge bg-sub text-white px-3 py-3 mb-2">
          {post.category}
        </div>
        {isOwnerUser && (
          <button onClick={() => deletePost(post._id)}>
            <FaTrash className="text-lg text-white" />
          </button>
        )}
      </div>
      <h3 className="text-xl text-white">{post.title}</h3>
      <h3 className="mt-2 text-gray-200">{post.reward}</h3>
      <div className="flex flex-row items-baseline justify-between my-3">
        <Link
          to={`/profile/${post.user?._id}`}
          className="flex items-center gap-2"
        >
          <img
            src={`${base}/uploads/${post.user?.profilePic}`}
            className="rounded-full w-5 h-5 object-contain"
            alt=""
          />
          <h4 className="text-gray-100">{post.user?.userName}</h4>
        </Link>
        {userdetails._id !== post.user._id && token && (
          <div
            className="text-white text-2xl cursor-pointer"
            onClick={() => createNewChat(post.user._id)}
          >
            <IoMdChatbubbles />
          </div>
        )}
      </div>
      <ToastContainer zIndex={99999999} />
    </div>
  );
};

export default ReqCard;
