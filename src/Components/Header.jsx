import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa";
import {
  indicatorContext,
  userDetailsContext,
  userTokenContext,
} from "../Services/AppContext";
import { base } from "../Services/base";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postRequest } from "../Services/allRequests";

const Header = () => {
  const { token } = useContext(userTokenContext);
  const [postObject, setPostObject] = useState({
    title: "",
    category: "",
    reward: "",
    user: "",
  });
  const { setIndicator } = useContext(indicatorContext);

  const navigate = useNavigate();

  const { userdetails } = useContext(userDetailsContext);

  const setInputs = (e) => {
    const { name, value } = e.target;
    setPostObject({ ...postObject, [name]: value });
  };

  const newPost = async (e) => {
    e.preventDefault();
    if (
      postObject.category == "" ||
      postObject.title == "" ||
      postObject.reward == ""
    ) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const reqHeader = {
        "Content-type": "application/json",
        access_token: `Bearer ${token}`,
      };
      postObject.user = userdetails._id;
      const res = await postRequest(postObject, reqHeader);
      if (res.data.request) {
        setIndicator(res.data.request);
        setPostObject({ title: "", category: "", reward: "", user: "" });
        toast.success("Request posted succesfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          document.getElementById("my_modal_2").close();
        }, 2000);
      }
    }
  };

  return (
    <div
      className={`bg-db  text-white py-4 w-full fixed top-0  px-2 lg:px-24 flex lg:justify-around items-center drawer justify-between z-50 `}
    >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <Link to={"/"} className="font-bold text-2xl">
        SkillSculpt
      </Link>
      <div className="lg:flex gap-12 font-bold hidden">
        <Link to={"/"}>Home</Link>
        <Link to={"/requests"}>Skill requests</Link>
        <a
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="cursor-pointer"
        >
          Post a request
        </a>
        {token && <Link to={"/chats"}>Messages</Link>}
      </div>
      <div>
        {token ? (
          <Link
            to={`/profile/${userdetails._id}`}
            className="lg:flex hidden items-center justify-center gap-3 font-bold"
          >
            <h1 className="text-sm">{userdetails.userName}</h1>
            <img
              className="w-8 h-8 rounded-full object-contain"
              src={`${base}/uploads/${userdetails.profilePic}`}
              alt=""
            />
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="btn-main shadow-md lg:flex hidden border-white border hover:border-0"
          >
            Login
          </Link>
        )}
      </div>

      {/* Drawer */}
      <label htmlFor="my-drawer" className="drawer-button text-2xl lg:hidden">
        <LuMenu></LuMenu>
      </label>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full font-bold gap-3 flex flex-col text-white bg-main">
          <label
            htmlFor="my-drawer"
            className="drawer-button text-2xl self-end text-white"
          >
            <FaChevronLeft></FaChevronLeft>
          </label>

          <label
            htmlFor="my-drawer"
            className="drawer-button ps-5 pb-2"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </label>
          <hr />

          <label
            htmlFor="my-drawer"
            className="drawer-button ps-5 py-2"
            onClick={() => {
              navigate("/requests");
            }}
          >
            Skill requests
          </label>
          <hr />
          <li onClick={() => document.getElementById("my_modal_2").showModal()}>
            <a>Post a request</a>
          </li>
          <hr />
          {token && (
            <label
              htmlFor="my-drawer"
              className="drawer-button ps-5 py-2"
              onClick={() => {
                navigate(`/chats`);
              }}
            >
              Messages
            </label>
          )}
          <hr />
          {token ? (
            <label
              htmlFor="my-drawer"
              className="drawer-button ps-5 py-2 flex items-center justify-start gap-2"
              onClick={() => {
                navigate(`/profile/${userdetails._id}`);
              }}
            >
              <img
                className="w-8 h-8 rounded-full object-contain"
                src={`${base}/uploads/${userdetails.profilePic}`}
                alt=""
              />
              <h1 className="text-sm">{userdetails.userName}</h1>
            </label>
          ) : (
            <label
              htmlFor="my-drawer"
              className="drawer-button ps-5 pt-2"
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Login
            </label>
          )}
        </ul>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-black">Write your request.</h3>
          <div className="py-4 text-black">
            {token ? (
              <form action="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="category">
                    Category or name of the skill
                  </label>
                  <input
                    value={postObject.category}
                    name="category"
                    onChange={(e) => setInputs(e)}
                    type="text"
                    id="category"
                    className="bg-white px-3 py-2 input-bordered input input-primary"
                  />

                  <label htmlFor="requestTitle">Title of your request.</label>
                  <textarea
                    value={postObject.title}
                    name="title"
                    onChange={(e) => setInputs(e)}
                    type="text"
                    placeholder="Title goes here..."
                    className="bg-white px-3 py-2 input-bordered input input-primary h-28"
                  />
                  <label htmlFor="return">
                    What are you willing to offer in return.
                  </label>
                  <textarea
                    value={postObject.reward}
                    name="reward"
                    onChange={(e) => setInputs(e)}
                    type="text"
                    placeholder="Return goes here..."
                    className="bg-white px-3 py-2 input-bordered input input-primary h-28"
                  />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    className="btn-main"
                    onClick={(e) => newPost(e)}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("my_modal_2").close()
                    }
                    className="btn-err"
                  >
                    cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl">Login to continue</h3>
                <Link
                  to={"/login"}
                  className="btn-main"
                  onClick={() => document.getElementById("my_modal_2").close()}
                >
                  Login
                </Link>
                <button
                  onClick={() => document.getElementById("my_modal_2").close()}
                  className="btn-err"
                >
                  cancel
                </button>
              </>
            )}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <ToastContainer zIndex={99999999} />
      </dialog>
    </div>
  );
};

export default Header;
