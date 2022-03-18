import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardSideBar } from ".";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions";
import { Toaster } from "react-hot-toast";
import { famReducerState } from "../../redux/reducers";
import { ChatComponent } from "../GlobalExports";


function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  let famJamUserId = sessionStorage.getItem("famJamUserId");
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

  const setComponent = () => {
    if (location.pathname === "/dashboard") {
      return <ChatComponent />;
    }
  };

  return (
    <div style={{ background: "black" }}>
      <DashboardSideBar userData={userData}>{setComponent()}</DashboardSideBar>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Dashboard;
