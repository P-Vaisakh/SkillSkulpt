import React, { useContext, useEffect, useState } from "react";
import ReqCard from "./ReqCard";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { getAllPosts } from "../Services/allRequests";
import { postsContext } from "../Services/AppContext";
import Skeleton from "./Skeleton";

const ReqSection = () => {
  const { setPosts, posts, loading, setLoading } = useContext(postsContext);

  const getPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data.reqs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-gray-100 py-28 px-6 md:px-10 lg:px-16 xl:px-32 text-center">
      <h2 className="text-3xl font-bold mb-16 text-center text-main">
        Browse Requests
      </h2>
      {loading && (
        <div className="grid lg:grid-cols-4 lg:gap-8 gap-6 text-start">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      {!loading && posts && posts.length == 0 && <p>No requests to show now</p>}

      {!loading && posts && posts.length > 0 && (
        <div className="grid lg:grid-cols-4 lg:gap-8 gap-6 text-start">
          {posts.slice(0, 4).map((post, i) => (
            <ReqCard post={post} key={i} />
          ))}
        </div>
      )}

      {!posts.length == 0 && (
        <div className="flex justify-center items-center mt-10 text-white">
          <Link
            to={"/requests"}
            className="flex justify-end items-center bg-main rounded-md px-4 py-2"
          >
            <p>See more requests</p>
            <FaChevronRight className="ms-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReqSection;
