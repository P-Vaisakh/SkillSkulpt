import React, { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { userDetailsContext, userTokenContext } from "../Services/AppContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAppreviews, postAppReview } from "../Services/allRequests";
import { base } from "../Services/base";

const Reviews = () => {
  const { token } = useContext(userTokenContext);
  const { userdetails } = useContext(userDetailsContext);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [indicator, setIndicator] = useState("");
  const responsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 3,
      itemsFit: "contain",
    },
  };

  const postReview = async () => {
    if (review == "") {
      toast.error("Review cannot be empty", {
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
      const reqheader = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };
      const body = { review };
      const response = await postAppReview(userdetails._id, body, reqheader);
      if (response.data.newReview) {
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
        setReview("");
        setIndicator(response.data.newReview);
        setTimeout(() => {
          document.getElementById("reviewModal").close();
        }, 2000);
      } else {
        toast.success("Something went wrong, please try again", {
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
    }
  };

  const getReviews = async () => {
    const response = await getAppreviews();
    setReviews(response.data.reviews);
  };

  useEffect(() => {
    getReviews();
  }, [indicator]);

  const items = reviews.map((review) => (
    <div
      key={review._id}
      className="bg-white rounded-lg px-8 py-6 mx-4 text-start shadow-lg "
    >
      <Link
        to={`/profile/${review.uid._id}`}
        className="flex flex-row items-center justify-start gap-4"
      >
        <img
          src={`${base}/uploads/${review.uid.profilePic}`}
          alt="review"
          className="h-9 w-9 rounded-full"
        />
        <div>
          <h5 className="text-black font-bold text-lg lg:text-xl">
            {review.uid.userName}
          </h5>
          <h5 className="text-sm lg:text-lg text-gray-500 ">
            {review.uid.designation}
          </h5>
        </div>
      </Link>
      <p className="mt-3 text-sm lg:text-lg text-black">{review.review}</p>
    </div>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 lg:px-20 pt-6 pb-16 container text-center ">
      <h1 className="text-main text-3xl mb-12 font-bold">User Testimonials</h1>
      <AliceCarousel
        mouseTracking
        items={items}
        infinite
        autoPlayInterval={2000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        autoPlay
      />
      <button
        className="bg-main text-white rounded-md px-4 py-2 mt-5 btn hover:bg-[#0c3c77]"
        onClick={() => document.getElementById("reviewModal").showModal()}
      >
        Post a review
      </button>

      <dialog id="reviewModal" className="modal ">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-black text-start">
            Post a review
          </h3>
          {token ? (
            <form
              action=""
              onSubmit={(e) => handleSubmit(e)}
              className="text-start pt-4"
            >
              <label htmlFor="review" className="text-black text-lg">
                Write your review.
              </label>{" "}
              <br />
              <textarea
                value={review}
                rows={5}
                type="text"
                id="review"
                className="border-gray-100 w-full my-2 rounded-md text-black bg-white py-2 px-4"
                placeholder="Your review goes here..."
                onChange={(e) => setReview(e.target.value)}
              />
              <button
                className="btn bg-main hover:bg-[#0c3c77] text-white mt-2"
                onClick={() => postReview()}
              >
                submit
              </button>
              <button
                onClick={() => document.getElementById("reviewModal").close()}
                className="btn-err"
              >
                cancel
              </button>
            </form>
          ) : (
            <>
              <h3 className="text-black text-xl">Login to Continue</h3>
              <Link to={"/login"} className="btn-main">
                Login
              </Link>
              <button
                onClick={() => document.getElementById("reviewModal").close()}
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
    </div>
  );
};

export default Reviews;
