import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import UserReview from "../Components/UserReview";
import EditProfile from "../Components/EditProfile";
import UserRequests from "../Components/UserRequests";
import { useNavigate, useParams } from "react-router-dom";
import {
  indicatorContext,
  userDetailsContext,
  userTokenContext,
} from "../Services/AppContext";
import { base } from "../Services/base";
import { getUser } from "../Services/allRequests";

const Profile = () => {
  const [tab, setTab] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  const [isOwnerUser, setIsOwnerUser] = useState(false);
  const { indicator } = useContext(indicatorContext);
  const [rating, setrating] = useState(0);

  const { userdetails } = useContext(userDetailsContext);

  const { id } = useParams();

  const getProfile = async () => {
    let response = await getUser(id);
    if (response.data.user.rating.rates.length == 0) {
      setrating(0);
    } else {
      let rate = response.data.user.rating.rates.reduce((a, b) => {
        return a + b;
      }, 0);
      setrating(rate / response.data.user.rating.rates.length);
    }
    setCurrentUser(response.data.user);
    if (response.data.user._id == userdetails._id) {
      setIsOwnerUser(true);
    } else {
      setIsOwnerUser(false);
    }
  };

  const { logout } = useContext(userTokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile();
  }, [userdetails, id, indicator]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100 flex items-start justify-center text-black">
      <div>
        <div className="flex flex-col lg:flex-row items-center justify-center py-5 lg:gap-20">
          <img
            src={`${base}/uploads/${currentUser.profilePic}`}
            alt=""
            className="w-48 h-48 rounded-full object-contain"
          />
          <div className="px-4 lg:px-0 pt-2 lg:pt-0 self-start">
            <div className="flex items-center justify-start text-2xl gap-3">
              <h3>{currentUser.userName}</h3>
              <Rating style={{ width: "120px" }} readOnly value={rating} />
            </div>
            <h3 className="text-gray-500 text-lg">
              {currentUser?.designation}
            </h3>
            <h3 className="max-w-xl ">{currentUser?.bio}</h3>
            <a href={currentUser?.link} className="font-bold text-blue-400">
              {currentUser?.link}
            </a>
            <br />
            {isOwnerUser && (
              <>
                <EditProfile />
                <button
                  className="btn-err transition-all duration-200"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        <hr className=" border-gray-200 border" />

        {/* Tabs */}
        <div className="mt-3 justify-center gap-4 flex ">
          <button
            className={`text-lg border  border-gray-100 pb-1 ${
              tab == 1
                ? "border-b-main text-black font-bold"
                : "text-gray-400 border-0"
            }`}
            onClick={() => setTab(1)}
          >
            Requests
          </button>
          <button
            className={`text-lg border  border-gray-100 pb-1 ${
              tab == 2
                ? "border-b-main text-black font-bold"
                : "text-gray-400 border-0"
            }`}
            onClick={() => setTab(2)}
          >
            Reviews
          </button>
        </div>

        {tab == 1 ? (
          <UserRequests isOwnerUser={isOwnerUser} currentUser={currentUser} />
        ) : (
          <UserReview isOwnerUser={isOwnerUser} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default Profile;
