import React, { createContext, useEffect, useState } from "react";

const userTokenContext = createContext();
const userDetailsContext = createContext();
const postsContext = createContext();
const indicatorContext = createContext();

const AppContext = ({ children }) => {
  const [token, setToken] = useState("");
  const [userdetails, setUserDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indicator, setIndicator] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    const user = localStorage.getItem("user");
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  const login = (newToken, user) => {
    setToken(newToken);
    setUserDetails(user);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserDetails({});
  };

  return (
    <>
      <userTokenContext.Provider value={{ token, login, logout }}>
        <userDetailsContext.Provider value={{ userdetails }}>
          <postsContext.Provider
            value={{ posts, setPosts, loading, setLoading }}
          >
            <indicatorContext.Provider value={{ setIndicator, indicator }}>
              {children}
            </indicatorContext.Provider>
          </postsContext.Provider>
        </userDetailsContext.Provider>
      </userTokenContext.Provider>
    </>
  );
};

export {
  AppContext,
  userTokenContext,
  userDetailsContext,
  postsContext,
  indicatorContext,
};
