import React, { useEffect, useState } from "react";
import { useNavigate,Route,Routes } from "react-router-dom";
import { DashboardSideBar } from ".";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, getUserProfile } from "../../redux/actions";
import { Toaster } from "react-hot-toast";
import { famReducerState } from "../../redux/reducers";
import { AddFamFriend, ChatComponent, FamFriendRequest } from "../GlobalExports";



function Dashboard() {
  const dispatch = useDispatch();
  
  const [conversations,setConversations]=useState([])
  const [message,setMessage]=useState([])
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
      <DashboardSideBar  conversations={conversations} message={message} setMessage={setMessage} userData={userData}>
        <Routes>
          <Route path="/" element={<ChatComponent  message={message} setMessage={setMessage} />}/>
          <Route path="/addFamFriend" element={<AddFamFriend/>}/>
          <Route path="/famFriendRequest" element={<FamFriendRequest/>}/>
        </Routes>
      </DashboardSideBar>
      
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Dashboard;
