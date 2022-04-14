import React, { useEffect, useState } from "react";
import { useNavigate,Route,Routes } from "react-router-dom";
import { DashboardSideBar } from ".";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, getUserProfile } from "../../redux/actions";
import { Toaster } from "react-hot-toast";
import { famReducerState } from "../../redux/reducers";
import { AddFamFriend, ChatComponent, CreateFamZone, FamFriendRequest, SpinAndWin } from "../GlobalExports";
import FamFriendsDisplay from "../FamFriendsDisplay/FamFriendsDisplay";

type dashboardType={
  setOnlineUsers:any
  onlineUsers:any
}

function Dashboard({setOnlineUsers,onlineUsers}:dashboardType) {
  const dispatch = useDispatch();
 
  const [conversations,setConversations]=useState([])
  const [message,setMessage]=useState([])
  const [activateMessage,setActivateMessage]=useState(false)
  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  useEffect(()=>{
    dispatch(getConversations (famJamUserId,setConversations ))
  },[famJamUserId])
  let userProfile = {
    userId: famJamUserId,
  };
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile(userProfile));
  }, []);
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  useEffect(() => {
    if (
      famjamAuthToken === "" ||
      famjamAuthToken === null ||
      famjamAuthToken === undefined
    ) {
      navigate("/signIn");
    }
  }, []);

  

  return (
    <div style={{ background: "black" }}>
      <DashboardSideBar setActivateMessage={setActivateMessage} onlineUsers={onlineUsers}   conversations={conversations} message={message} setMessage={setMessage} userData={userData}>
        <Routes>
          <Route path="/" element={<ChatComponent onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers}  activateMessage={activateMessage} setActivateMessage={setActivateMessage}  message={message} setMessage={setMessage} />}/>
          <Route path="/addFamFriend" element={<AddFamFriend/>}/>
          <Route path="/famFriendRequest" element={<FamFriendRequest/>}/>
          <Route path="/hitAndWin" element={<SpinAndWin/>}/>
          <Route path="/famFriends" element={<FamFriendsDisplay/>}/>
          <Route path="/createFamZone" element={<CreateFamZone/>}/>
        </Routes>
      </DashboardSideBar>
      
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Dashboard;
