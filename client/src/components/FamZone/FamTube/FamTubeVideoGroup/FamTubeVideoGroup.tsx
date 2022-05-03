import React, { useEffect, useRef, useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { io } from 'socket.io-client';
import Peer from "simple-peer";
import { FamTubeVideoPlayerFriend, FamTubeVideoPlayerUser } from '..';
import '../../../../styles/FamZoneStyles/FamTubeVideoGroup.scss'
import { famReducerState } from '../../../../redux/reducers';
import { useSelector } from 'react-redux';
function FamTubeVideoGroup() {
    const[friendPresent,setFriendPresent]=useState<any>(null)
    const [stream, setStream] = useState<any>(null);
    const [yourID, setYourID] = useState("");
    const [friendStream,setFriendStream]=useState<any>(null)
    const [receivingCall, setReceivingCall] = useState<boolean>(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [callEnded,setCallEnded]=useState<boolean>(false)
    const socket = useRef<any>();
    const myVideo=useRef<any>();
    const friendVideo=useRef<any>();

    const connectionRef=useRef<any>()
    const [mute,setMute]=useState<boolean>(false)
    const [offVideo, setOffVideo] = useState<boolean>(false);
    const [peers,setPeers]=useState<any>([])
    const peersRef=useRef<any>([]);
    let famJamUserId = sessionStorage.getItem("famJamUserId");
 
    useEffect(() => {
      
      socket.current = io("http://localhost:7000");
      getMedia();
      socket.current.on("me",(id:any)=>{
        setYourID(id)
      })
      // socket.current.on("friendJoined",(data:any)=>{
      //   setReceivingCall(true)
      //   setCaller(data.callerId)
      //   setCallerSignal(data.signal)
      // })
      socket.current.emit("addUser",famJamUserId)
      socket.current.on("getUsers",(users:any)=>{
        console.log(users)
        const peerNew:any=[]
        users.forEach((user:any)=>{
          const peer=callUsers(user.userId,yourID,stream)
          peersRef.current.push({
            peerId:user.userId,
            peer
          })
            peerNew.push(peer)
        })   
        setPeers(peerNew)
        
      })
      socket.current.on("friendJoined", (payload:any) => {
        const peer = answerCall(payload.signal, payload.callerId, stream);
        peersRef.current.push({
            peerID: payload.callerId,
            peer,
        })

        setPeers((users:any) => [...users, peer]);
    });
    
    socket.current.on("receivingFriendSignal", (payload:any) => {
      const item = peersRef.current.find((p:any) => p.peerID === payload.id);
   
      item.peer.signal(payload.signal);
  });
     
    }, []);
  
    const getMedia = async () => {
      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream:MediaStream) => {
          setStream(stream);
  
        });
  
    };

    const callUsers=(userToSignal:any,callerId:any,stream:MediaStream)=>{
   
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
    });

    peer.on("signal", (signal:any) => {
    
      socket.current.emit("sending signal", {userToSignal,callerId,signal});
  });
  return peer


    }
    function answerCall(incomingSignal:any, callerId:any, stream:MediaStream) {
      const peer = new Peer({
          initiator: false,
          trickle: false,
          stream,
      })

      peer.on("signal", (signal:any) => {
          socket.current.emit("returning signal", { signal, callerId })
      })

      peer.signal(incomingSignal);

      return peer;
  }

  return (
    <>
    <Grid className='famTubeVideoGroupColumn'>
    <Grid.Row centered stretched className='famTubeVideoGroupUserRow'>
    <Grid.Column computer={6}>
    <FamTubeVideoPlayerUser stream={stream} myVideo={myVideo}/>
    </Grid.Column>
    {
      peers.map((peer:any,key:number)=>(
        <Grid.Column computer={6} key={key}>
          <FamTubeVideoPlayerFriend peer={peer}/>
        </Grid.Column>
      ))
    }
    </Grid.Row>
    {/* <Grid.Row className='famTubeVideoGroupPlayer'>

    </Grid.Row>
    <Grid.Row className='famTubeVideoGroupUserRow'>

    </Grid.Row> */}
    </Grid>
  </>
  )
}

export default FamTubeVideoGroup