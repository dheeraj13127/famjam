import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Dashboard, EditProfile, Landing, SignIn, SignUp } from "./components/GlobalExports";

import "./App.scss";

function App() {

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;
