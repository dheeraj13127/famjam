import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { AddFamFriend, Dashboard, Landing, SignIn, SignUp } from "./components/GlobalExports";

import "./App.scss";

function App() {

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard/>}/>

      
      </Routes>
    </Router>
  );
}

export default App;
