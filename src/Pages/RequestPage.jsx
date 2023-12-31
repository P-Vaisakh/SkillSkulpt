import React, { useContext, useEffect, useState } from "react";
import ReqCard from "../Components/ReqCard";
import { indicatorContext, postsContext } from "../Services/AppContext";
import Skeleton from "../Components/Skeleton";
import { getAllPosts } from "../Services/allRequests";

const RequestPage = () => {
  const { posts, loading, setPosts, setLoading } = useContext(postsContext);
  const { indicator } = useContext(indicatorContext);
  const [search, setSearch] = useState([]);

  const getPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data.reqs);
      setSearch(res.data.reqs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchSkill = (e) => {
    let searchResults = search.filter((i) =>
      i.category.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
    );
    setPosts(searchResults);
  };

  useEffect(() => {
    getPosts();
  }, [indicator]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 lg:px-28 px-3 pb-10 text-center text-main bg-gray-100">
      <h3 className="text-3xl font-bold mb-8">Help people learn a skill</h3>
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden my-9 max-w-md md:mx-auto mx:6 border border-gray-200">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-900 pr-2 bg-white border px-3 "
          type="text"
          id="search"
          placeholder="Search for a skill ..."
          onChange={(e) => {
            searchSkill(e);
          }}
        />
      </div>
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
        <div className="grid lg:grid-cols-4 lg:gap-8 gap-6 text-start px-4 ">
          {posts.map((post, i) => (
            <ReqCard post={post} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestPage;
