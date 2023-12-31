import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../Services/allRequests";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { userTokenContext } from "../Services/AppContext";

const Auth = ({ register }) => {
  const userNameref = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isValiUsername, setValidUsername] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);

  const { login } = useContext(userTokenContext);

  const navigate = useNavigate();

  const setInputs = (e) => {
    const { name } = e.target;
    if (name === "userName") {
      if (userNameref.current.value.length < 5) {
        setValidUsername(true);
      } else {
        setValidUsername(false);
      }
    }

    if (name === "email") {
      if (
        emailRef.current.value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
      ) {
        setValidEmail(false);
      } else {
        setValidEmail(true);
      }
    }

    if (name === "password") {
      if (passwordRef.current.value.length < 6) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register) {
      if (!isValiUsername && !isValidEmail && !isValidPassword) {
        const data = {
          userName: userNameref.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
        const res = await signupUser(data);
        if (res.status == 200) {
          toast.success("Account created succesfully, kindly login", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          userNameref.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          navigate("/login");
        } else {
          toast.error(res.response.data, {
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
      } else {
        toast.error("Fill all details", {
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
    } else {
      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await loginUser(data);
      if (res.status == 200) {
        toast.success("Login succesful", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        emailRef.current.value = "";
        passwordRef.current.value = "";
        login(res.data.token,res.data.user);
        navigate("/");
      } else {
        toast.error(res.response.data, {
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

  return (
    <div className="bg-[#062863]  h-screen py-10">
      <div className="flex flex-col justify-center items-center lg:px-32 h-[95%]">
        <div className="w-[95%] lg:w-[40%] border border-gray-300 shadow-lg rounded-lg py-6 px-10 bg-slate-50">
          <h1 className="text-center text-2xl font-bold mb-7 text-[#062863]">
            {register ? "Signup" : "Login"}
          </h1>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            {register && (
              <>
                <input
                  name="userName"
                  ref={userNameref}
                  onChange={(e) => setInputs(e)}
                  type="text"
                  className="input bg-[#EDF2F7] placeholder:text-gray-500 border-none outline-none"
                  placeholder="Username"
                />
                {isValiUsername && (
                  <p className="text-sm text-red-500">
                    Username should contain atleast 5 letters.
                  </p>
                )}
              </>
            )}

            <input
              name="email"
              ref={emailRef}
              onChange={(e) => setInputs(e)}
              type="email"
              className="input bg-[#EDF2F7] placeholder:text-gray-500 border-none outline-none"
              placeholder="Email"
            />
            {isValidEmail && (
              <p className="text-sm text-red-500">Email not valid.</p>
            )}

            <input
              name="password"
              ref={passwordRef}
              onChange={(e) => setInputs(e)}
              type="password"
              autoComplete="off"
              className="input bg-[#EDF2F7] placeholder:text-gray-500 border-none outline-none"
              placeholder="Password"
            />
            {isValidPassword && (
              <p className="text-sm text-red-500">Password too short.</p>
            )}

            <button className="btn bg-[#1c4793] hover:bg-[#062863] text-white font-bold">
              Submit
            </button>
          </form>
          {register ? (
            <>
              <p className="mt-3 text-center">
                Already have an account?
                <Link to={"/login"} className="ms-2 text-blue-600 underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <p className="mt-3 text-center">
              Dont have an account?
              <Link to={"/signup"} className="ms-2 text-blue-600 underline">
                Signup
              </Link>
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
