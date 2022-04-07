import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dimmer, Grid, Loader } from "semantic-ui-react";
import { famReducerState } from "../../redux/reducers";
import "../../styles/VideoCallFriendStyles/VideoCallFriend.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, getVideoCallFriendProfile } from "../../redux/actions";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { FriendVideoPlayer } from "./FriendVideoPlayer/FriendVideoPlayer";
import { AfterCall, BeforeCall, FriendOffline, VideoCallNavbar } from ".";

type videoCallFriendType={
  onlineUsers:any,
  setOnlineUsers:any
}
function VideoCallFriend({onlineUsers,setOnlineUsers}:videoCallFriendType) {

  // const onlUsers=useSelector<famReducerState,famReducerState["onlUsers"]>(state=>state.onlUsers)
  const {id}=useParams()
  const[friendPresent,setFriendPresent]=useState<any>(null)
  const [stream, setStream] = useState<any>(null);
  const [yourID, setYourID] = useState("");
  const [friendStream,setFriendStream]=useState<any>(null)
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded,setCallEnded]=useState(false)
  const socket = useRef<any>();
  const myVideo=useRef<any>();
  const friendVideo=useRef<any>();
  const connectionRef=useRef<any>()
  const [mute,setMute]=useState(false)
  const [offVideo, setOffVideo] = useState(false);
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  useEffect(() => {
    
    socket.current = io("https://famjams.herokuapp.com");
    getMedia();
    socket.current.on("me",(id:any)=>{
      setYourID(id)
    })
    socket.current.on("callUser",(data:any)=>{
      setReceivingCall(true)
      setCaller(data.from)
      setCallerSignal(data.signal)
    })
    socket.current.emit("addUser",famJamUserId)
    socket.current.on("getUsers",(users:any)=>{
   
    let fp=users.find((use:any)=>use.userId===id)
    setFriendPresent(fp)
   
   
    })
   
  }, []);

  const getMedia = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream:MediaStream) => {
        setStream(stream);
        
      });

  };
  
  const dispatch = useDispatch();
  
  let userProfile = {
    userId: famJamUserId,
  };
  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile(userProfile));
    dispatch(getVideoCallFriendProfile(id))
  }, []);
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

 const callUser=(ids:any)=>{
  const peer = new Peer({
    initiator: true,
    trickle: false,

    stream: stream,
  });

  peer.on("signal", (data:any) => {
    socket.current.emit("calluser", { userToCall: ids, signalData: data, from: yourID })
  })

  peer.on("stream", (stream:MediaStream) => {
    if (friendVideo.current) {
      friendVideo.current.srcObject = stream;
      setFriendStream(stream)
      
    }
  });

  socket.current.on("callAccepted", (signal:any) => {
    setCallAccepted(true);
    peer.signal(signal);
  })
  connectionRef.current = peer
 }

 const acceptCall=()=>{
  setCallAccepted(true);
  setReceivingCall(false)
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream: stream,
  });
  peer.on("signal", (data:any) => {
    socket.current.emit("answerCall", { signal: data, to: caller })
  })

  peer.on("stream", (stream:MediaStream) => {
    friendVideo.current.srcObject = stream;
    setFriendStream(stream)
  });

  peer.signal(callerSignal);
  connectionRef.current = peer
 }
 const leaveCall = () => {
  setCallEnded(true)
  
  connectionRef.current=null
  window.location.href="/dashboard"
  
}






  return (
    <>
      <VideoCallNavbar />
      <div className="videoCallFriendContainer">
        {userData ? (
          <>
            <Grid className="videoCallFriendColumn">
           <Grid.Row centered stretched>
            <Grid.Column textAlign="center"  mobile={16} tablet={16} computer={16} largeScreen={8} widescreen={8}>
            <VideoPlayer myVideo={myVideo} mute={mute} stream={stream}/>
            
            </Grid.Column>
            <Grid.Column textAlign="center" mobile={16} tablet={16} computer={16} largeScreen={8} widescreen={8} >
              {
                callAccepted&&friendPresent?(<FriendVideoPlayer friendStream={friendStream} offVideo={offVideo} friendVideo={friendVideo}  stream={stream}/>):(<FriendOffline receivingCall={receivingCall} acceptCall={acceptCall}/>)
              }
           
            
            </Grid.Column>
           
           </Grid.Row>
           <Grid.Row centered stretched>
              <Grid.Column mobile={16} tablet={16} computer={8} largeScreen={8} >
              {
                callAccepted&&!callEnded?(
                 
                  <AfterCall offVideo={offVideo} setOffVideo={setOffVideo} stream={stream} leaveCall={leaveCall} mute={mute} setMute={setMute}/>
                ):(
                  <BeforeCall stream={stream} mute={mute} setMute={setMute} callUser={callUser} id={id} receivingCall={receivingCall}/>
                )
              }
              </Grid.Column>
           </Grid.Row>
            </Grid>
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

export default VideoCallFriend;
