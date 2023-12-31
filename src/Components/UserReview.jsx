import React, { useContext, useEffect, useState } from "react";
import UserReviewCard from "./UserReviewCard";
import {
  indicatorContext,
  userDetailsContext,
  userTokenContext,
} from "../Services/AppContext";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getReviews, postReview, updateRating } from "../Services/allRequests";
import Skeleton from "./Skeleton";

const UserReview = ({ isOwnerUser, currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { token } = useContext(userTokenContext);
  const { userdetails } = useContext(userDetailsContext);
  const { setIndicator } = useContext(indicatorContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    title: "",
    val: "",
    author: "",
    about: "",
  });

  const setInputs = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Rating should be atleast 1", {
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
      if (review.val == "" || review.title == "") {
        toast.error("Fields cannot be empty", {
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
        review.author = userdetails._id;
        review.about = currentUser._id;
        const headers = {
          "Content-Type": "application/json",
          access_token: `Bearer ${token}`,
        };
        const reqBody = { uid: userdetails._id, rate: rating };
        const result = await updateRating(currentUser._id, reqBody, headers);
        const response = await postReview(review, headers);
        setIndicator(result.data);
        if (response.data.review) {
          toast.success("Review posted succesfully", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setReview({ title: "", val: "", author: "", about: "" });
          getUserReviews();
          setTimeout(() => {
            document.getElementById("userReviewModal").close();
          }, 2000);
        }
      }
    }
  };

  const getUserReviews = async () => {
    try {
      const res = await getReviews(currentUser._id);
      if (res.data.reviews) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserReviews();
  }, [currentUser]);

  return (
    <>
      <div className="mt-3 lg:px-10 px-4 text-start pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-main">Reviews</h3>
          {!isOwnerUser && (
            <button
              className="border border-main rounded-md px-4 py-2 hover:bg-main hover:text-white transition-all duration-300"
              onClick={() =>
                document.getElementById("userReviewModal").showModal()
              }
            >
              Add a review
            </button>
          )}
        </div>
        <div>
          {reviews.length > 0 &&
            reviews.map((rev, i) => <UserReviewCard rev={rev} key={i} />)}
          {reviews && loading && (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          {reviews.length === 0 && !loading && (
            <>
              <p className="text-center my-10">No reviews to show</p>
            </>
          )}
        </div>
      </div>

      <dialog id="userReviewModal" className="modal ">
        <div className="modal-box bg-white">
          {token && !currentUser.rating.uids.includes(userdetails._id) ? (
            <>
              <h3 className="font-bold text-lg text-black text-start">
                Post a review
              </h3>
              <form
                action=""
                onSubmit={(e) => handleSubmit(e)}
                className="text-start pt-4"
              >
                <Rating
                  value={rating}
                  style={{ width: "120px" }}
                  className="my-3"
                  onChange={(e) => setRating(e)}
                />
                <textarea
                  value={review.title}
                  onChange={(e) => setInputs(e)}
                  name="title"
                  className="border-gray-400 border w-full my-2 rounded-md text-black bg-white py-2 px-4"
                  rows="1"
                  placeholder="Title of your review"
                ></textarea>
                <br />
                <textarea
                  value={review.val}
                  onChange={(e) => setInputs(e)}
                  name="val"
                  rows={5}
                  type="text"
                  id="review"
                  className="border-gray-400 border w-full my-2 rounded-md text-black bg-white py-2 px-4"
                  placeholder="Your review goes here..."
                />
                <button
                  type="submit"
                  onClick={(e) => handleReview(e)}
                  className="btn bg-main hover:bg-[#0c3c77] text-white mt-2"
                >
                  submit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("userReviewModal").close()
                  }
                  className="btn-err"
                >
                  cancel
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-black text-xl mb-6">
                {currentUser.rating.uids.includes(userdetails._id)
                  ? "You have already rated this user"
                  : "Login to Continue"}
              </h3>
              {
                <Link
                  to={"/login"}
                  className={`btn-main ${
                    currentUser.rating.uids.includes(userdetails._id) &&
                    "hidden"
                  }`}
                >
                  Login
                </Link>
              }
              <button
                onClick={() =>
                  document.getElementById("userReviewModal").close()
                }
                className="btn-err"
              >
                cancel
              </button>
            </>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <ToastContainer zIndex={99999999} />
      </dialog>
    </>
  );
};

export default UserReview;
