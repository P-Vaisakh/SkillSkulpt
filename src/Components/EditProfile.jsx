import React, { useEffect, useState } from "react";
import { updateUser } from "../Services/allRequests";
import { useContext } from "react";
import { userDetailsContext, userTokenContext } from "../Services/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base } from "../Services/base";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userdetails } = useContext(userDetailsContext);
  const { token, login } = useContext(userTokenContext);
  const [user, setUser] = useState({
    profilePic: "",
    userName: "",
    email: "",
    designation: "",
    bio: "",
    link: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const setInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const editUserProfile = async (e) => {
    e.preventDefault();

    const { userName, email, bio, link, designation, profilePic } = user;
    if (userName == "" || email == "") {
      toast.error("Username and email cannot be empty", {
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
        "Content-Type": "multipart/form-data",
        access_token: `Bearer ${token}`,
      };
      const reqBody = new FormData();
      reqBody.append("userName", userName);
      reqBody.append("email", email);
      reqBody.append("bio", bio);
      reqBody.append("link", link);
      reqBody.append("designation", designation);
      reqBody.append("profilePic", selectedImage ? selectedImage : profilePic);
      const res = await updateUser(userdetails._id, reqBody, reqHeader);
      if (res.data.user) {
        login(token, res.data.user);
        toast.success("Profile upated succesfully", {
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
          document.getElementById("editProfileModal").close();
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const userObj = { ...user, ...userdetails };
    setUser(userObj);
  }, [userdetails]);

  return (
    <>
      <button
        className="btn-main"
        onClick={() => document.getElementById("editProfileModal").showModal()}
      >
        Edit profile
      </button>

      <dialog id="editProfileModal" className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-black text-start">
            Edit your profile here
          </h3>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="text-start pt-4"
          >
            <div className="flex flex-col items-center py-4">
              <label htmlFor="img1">
                <img
                  className="w-44 h-44 rounded-full object-contain"
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `${base}/uploads/${user.profilePic}`
                  }
                />
              </label>
              <input
                type="file"
                id="img1"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
            <input
              value={user?.userName}
              name="userName"
              onChange={(e) => setInputs(e)}
              type="text"
              className="border border-gray-300 w-full bg-white h-10 text-black rounded-md px-2 py-1"
              placeholder="Username"
            />
            <input
              onChange={(e) => setInputs(e)}
              name="email"
              value={user?.email}
              type="text"
              className="border border-gray-300 w-full bg-white h-10 text-black rounded-md px-2 py-1 mt-3"
              placeholder="Email"
            />
            <input
              onChange={(e) => setInputs(e)}
              name="designation"
              value={user?.designation}
              type="text"
              className="border border-gray-300 w-full bg-white h-10 text-black rounded-md px-2 py-1 mt-3"
              placeholder="Title"
            />
            <textarea
              onChange={(e) => setInputs(e)}
              name="bio"
              value={user?.bio}
              className="border border-gray-300 w-full bg-white text-black rounded-md px-2 py-1 mt-3 h-28"
              placeholder="Bio"
            ></textarea>
            <textarea
              onChange={(e) => setInputs(e)}
              name="link"
              value={user?.link}
              type="text"
              className="border border-gray-300 w-full bg-white text-black rounded-md px-2 py-1 mt-3"
              placeholder="Any social media link to prove your credibility"
            />
            <br />

            <button
              type="submit"
              className="btn bg-main hover:bg-[#0c3c77] text-white mt-2"
              onClick={(e) => editUserProfile(e)}
            >
              submit
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById("editProfileModal").close()
              }
              className="btn-err"
            >
              cancel
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <ToastContainer zIndex={99999999} />
      </dialog>
    </>
  );
};

export default EditProfile;
