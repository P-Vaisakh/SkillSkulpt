import React from "react";
import { base } from "../Services/base";

const UserReviewCard = ({ rev }) => {
  return (
    <div className="bg-white px-8 py-4 shadow-sm mt-2">
      <h3 className="text-main font-bold text-xl">{rev.title}</h3>
      <p className="text-lg max-w-2xl mt-2">{rev.val}</p>
      <hr className="border border-gray-300 my-2" />
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center justify-start gap-2">
          <img
            src={`${base}/uploads/${rev.author.profilePic}`}
            className="rounded-full w-7 h-7 "
            alt=""
          />
          <h4 className="font-bold text-lg">{rev?.author?.userName}</h4>
        </div>
      </div>
    </div>
  );
};

export default UserReviewCard;
