import React, { useContext, useEffect, useState } from "react";
import ReqCard from "./ReqCard";
import { getReviews, getUserPosts } from "../Services/allRequests";
import {
  indicatorContext,
  postsContext,
  userDetailsContext,
} from "../Services/AppContext";
import Skeleton from "./Skeleton";

const UserRequests = ({ isOwnerUser, currentUser }) => {
  const { userdetails } = useContext(userDetailsContext);
  const { loading, setLoading, posts, setPosts } = useContext(postsContext);
  const { indicator } = useContext(indicatorContext);

  const getUserRequests = async () => {
    setLoading(true);
    try {
      let response = await getUserPosts(currentUser._id);
      setPosts(response.data.userRequests);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserRequests();
  }, [currentUser, indicator]);

  return (
    <div className="py-10">
      {loading && (
        <div className="grid lg:grid-cols-3 lg:gap-8 gap-6 text-start">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      {!loading && posts && posts.length == 0 && (
        <p className="text-center">No requests to show now</p>
      )}

      {!loading && posts && posts.length > 0 && (
        <div className="grid lg:grid-cols-3 lg:gap-8 gap-6 text-start px-4 ">
          {posts.map((post, i) => (
            <ReqCard post={post} key={i} isOwnerUser={isOwnerUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequests;
