import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



const Footer = () => {
  return (
    <div className="bg-main w-full  justify-around lg:flex-row flex-col flex items-start text-white lg:px-20 py-10 px-4 gap-5 lg:gap-0">
      <div className="max-w-md">
        <h1 className="font-bold text-2xl">SkillSkulpt</h1>
        <h5 className="mt-3 text-lg">
          Unleash your potential with SkillSculpt. Share your expertise, connect
          with like-minded learners, and embark on a journey of mutual growth.
          Elevate your skills, empower others, thrive together!
        </h5>
        <button className="mt-3 bg-white text-main rounded-lg font-bold px-4 py-2">
          Get Started
        </button>
      </div>
      <div>
        <div className="flex lg:flex-row flex-col items-start justify-around lg:gap-6 gap-3">
          <h5 className="font-bold text-xl">Contact us</h5>
          <div className="flex items-center justify-start gap-2">
            <CiLocationOn className="font-bold text-lg" />{" "}
            <p className="max-w-[270px]">
              Wisconsin Ave, Suit 700 Chevy Chase, Maryland, 20815
            </p>{" "}
          </div>
          <div className="flex items-center justify-start gap-2">
            {" "}
            <CiMail className="font-bold text-lg" />
            <p>support@skillskulpt.in</p>
          </div>
          <div className="flex items-center justify-start gap-2">
            {" "}
            <IoCallOutline className="font-bold text-lg" />
            <p>7505717520</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start gap-8">
          <h5 className="font-bold text-xl">Follow us</h5>
          <FaFacebookF  />
          <FaXTwitter  />
          <FaInstagram  />
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
};

export default Footer;
