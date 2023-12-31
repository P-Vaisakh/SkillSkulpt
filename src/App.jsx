import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Header from "./Components/Header";
import { useContext, useEffect } from "react";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import RequestPage from "./Pages/RequestPage";
import { userDetailsContext, userTokenContext } from "./Services/AppContext";
import Chat from "./Pages/Chat";

export default function App() {
  const { token } = useContext(userTokenContext);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Auth></Auth>}></Route>
        <Route path="/signup" element={<Auth register></Auth>}></Route>
        <Route path="/profile/:id" element={<Profile></Profile>}></Route>
        <Route path="/requests" element={<RequestPage></RequestPage>}></Route>
        <Route
          path="/chats"
          element={<Chat></Chat>}
        ></Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}
