import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Dimmer, Grid, Header, Label, Loader } from "semantic-ui-react";
import { io } from "socket.io-client";
import { FamTubeNavbar, FamTubeVideoGroup } from ".";
import {
  getFamFriends,
  getIndividualFamZone,
  getOnlineUsers,
  getParticularFamZoneMembers,
  getUserProfile,
} from "../../../redux/actions";
import { famReducerState } from "../../../redux/reducers";
import '../../../styles/FamZoneStyles/FamTube.scss'
function FamTube() {
  const socket = useRef<any>();
  const dispatch = useDispatch();
  const [yourID, setYourID] = useState("");
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  let userProfile = {
    userId: famJamUserId,
  };
  let { id } = useParams();

  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile(userProfile));
    dispatch(getIndividualFamZone(id));
    dispatch(getFamFriends(famJamUserId));
    dispatch(getParticularFamZoneMembers(id));
  }, []);
  // useEffect(() => {
  //   socket.current = io("https://famjams.herokuapp.com");
  //   // getMedia();
  //   socket.current.on("me", (id: any) => {
  //     setYourID(id);
  //   });

  //   socket.current.emit("addUser", famJamUserId);
  //   socket.current.on("getUsers", (users: any) => {
  //     dispatch(getOnlineUsers(users));
  //     console.log(users,"onl")
  //   });
  // }, []);
  useEffect(() => {
    if (
      famjamAuthToken === "" ||
      famjamAuthToken === null ||
      famjamAuthToken === undefined
    ) {
      navigate("/signIn");
    }
  }, []);
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );

  let individualFamZoneData = useSelector<
    famReducerState,
    famReducerState["individualFamZoneData"]
  >((state) => state.individualFamZoneData);
  const onlUsers = useSelector<famReducerState, famReducerState["onlUsers"]>(
    (state) => state.onlUsers
  );
  const checkActiveUser = (fid: any) => {
    let res = onlUsers && onlUsers.filter((f: any) => fid === f.userId);
    if (res && res.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const currentFamZoneMembers = useSelector<
    famReducerState,
    famReducerState["particularFamZoneMembers"]
  >((state) => state.particularFamZoneMembers);
  return (
    <>
      <FamTubeNavbar />
      <div className="famTubeContainer">
    {userData ? (
       <>
       <FamTubeVideoGroup/>
       </>
    
        ) : (
          <Dimmer active className="noMessageLoader">
            <Loader>Loading...</Loader>
          </Dimmer>
        )}
        <Toaster position="top-center" reverseOrder={false} />
       
    </div>
    </>
  );
}

export default FamTube;
