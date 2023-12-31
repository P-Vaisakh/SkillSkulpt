import React, { useEffect } from "react";
import hero from "../assets/cover2-removebg.png";
import Feature from "../Components/Feature";
import ReqSection from "../Components/ReqSection";
import Reviews from "../Components/Reviews";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-gray-100 items-center justify-around text-gray-800 lg:px-20 min-h-screen">
        <div className="lg:max-w-2xl flex items-center justify-end">
          <div className="lg:ps-20 pt-20 lg:pt-0 px-5 lg:px-0">
            <h1 className="text-5xl font-bold mb-5">
              Empower Your Potential, Share Your Expertise!
            </h1>
            <h1 className="text text-lg leading-7">
              Unleash your potential with SkillSculpt. Share your expertise,
              connect with like-minded learners, and embark on a journey of
              mutual growth. Elevate your skills, empower others, thrive
              together!
            </h1>
            <div className="mt-2 flex gap-2">
              <Link
                to={"/requests"}
                className="btn-main text-white hover:bg-[#041f38] text-[16px]"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-full flex items-center justify-around lg:pt-0 bg-gray-100">
          <img
            src={hero}
            alt=""
            className="object-cover w-[90%] lg:w-2/3 rounded-md bg-gray-100"
          />
        </div>
      </div>
      <Feature></Feature>
      <ReqSection></ReqSection>
      <Reviews></Reviews>
    </>
  );
};

export default Home;
