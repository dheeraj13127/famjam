import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Dashboard, EditProfile, FamZone, Landing, RewardsSection, SignIn, SignUp, VideoCallFriend } from "./components/GlobalExports";

import "./App.scss";


function App() {

const [onlineUsers,setOnlineUsers]=useState<any>(null)
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers}/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/>
        <Route path="/videoCall/:id" element={<VideoCallFriend onlineUsers={onlineUsers} setOnlineUsers={setOnlineUsers}/>}/>
        <Route path="/redeem" element={<RewardsSection/>}/>
        <Route path="/famZone/:id" element={<FamZone/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
