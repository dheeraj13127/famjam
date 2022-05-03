import React, { useEffect, useRef, useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Dimmer, Grid, Header, Icon, Image, Label, Loader, Message } from 'semantic-ui-react'
import { getFamFriends, getIndividualFamZone, getOnlineUsers, getParticularFamZoneMembers, getUserProfile } from '../../redux/actions';
import { famReducerState } from '../../redux/reducers';
import FamZoneNavbar from './FamZoneNavbar/FamZoneNavbar'
import '../../styles/FamZoneStyles/FamZone.scss'
import { io } from "socket.io-client";
import { famFriendsType } from '../../redux/actionTypes/types';

import ParticlesBg from "particles-bg";
function FamZone() {
  const socket = useRef<any>();
  const dispatch = useDispatch();
  const [yourID, setYourID] = useState("");
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  let userProfile = {
    userId: famJamUserId,
  };
  let {id}=useParams()
  
  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile(userProfile));
    dispatch(getIndividualFamZone(id))
    dispatch(getFamFriends(famJamUserId));
    dispatch(getParticularFamZoneMembers(id))
  }, []);

  useEffect(() => {
    
    socket.current = io("https://famjams.herokuapp.com");
    // getMedia();
    socket.current.on("me",(id:any)=>{
      setYourID(id)
    })

    socket.current.emit("addUser",famJamUserId)
    socket.current.on("getUsers",(users:any)=>{
      
      dispatch(getOnlineUsers(users))
   
    })
   
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

 

  let individualFamZoneData=useSelector<famReducerState,famReducerState["individualFamZoneData"]>(state=>state.individualFamZoneData)
  const onlUsers=useSelector<famReducerState,famReducerState["onlUsers"]>(state=>state.onlUsers)
  const checkActiveUser=(fid:any)=>{
  
    let res=onlUsers&&onlUsers.filter((f:any)=>fid===f.userId)
    if(res&&res.length>0){
      return true
    }
    else{
      return false
    }
  
}
  const currentFamZoneMembers=useSelector<famReducerState,famReducerState["particularFamZoneMembers"]>(state=>state.particularFamZoneMembers)
 const onNavigateToFamTube=()=>{
  toast("Under development", {
    icon: "⏳",
  });
  //  window.location.href=`/famZone/${id}/famTube`
 }
  return (
    
    <>
    <FamZoneNavbar/>
    <div className="famZoneContainer">
    {userData ? (
          <>
            <Header className="editProfileHeader" textAlign="center" as="h3">
              <Label className="spinAndWinHeader" color="blue" size="huge">
               Welcome to {individualFamZoneData&&individualFamZoneData.famZoneName} Zone
              </Label>
            </Header>
            <Grid className="famZoneColumn">
           
             <Grid.Row centered stretched className='famZoneRow'>
             <ParticlesBg type="circle" bg={true}  />
               {
                 currentFamZoneMembers&&currentFamZoneMembers.map((fd:famFriendsType,key:number)=>{
                   
                     return(
                      <Grid.Column key={key} textAlign='center' computer={4} tablet={8} mobile={16} >
                        <Message className='famZoneMemberInfo'>
                        {
                          checkActiveUser(fd._id)?(
                            <span className="famZoneActive"></span>
                          ):(
                            <span className="famZoneInactive"></span>
                          )
                        }
                          <Image centered size='tiny' src={fd.profilePicUrl}/>
                        <Header as="h3" className='famZoneMemberHeader'>{fd.userName}</Header>
                        {
                          individualFamZoneData.famZoneAdmin===fd._id?(
                         <span className='famZoneMemberInfoPosition'>Admin</span>
                          ):(
                            <span className='famZoneMemberInfoPosition'>Member</span>
                          )
                        }
                        
                        </Message>
                        
                      </Grid.Column>
                     )
                   
                 })
               }
                <Grid.Column textAlign='center' computer={16} >
                 <div className="famTubeCol">
                 <div className="famTubeBox">
                   <Header className='famTubeHeader'>Enjoy the FamZones very own feature FamTube</Header>
                  <Button className='famTubeButton' onClick={onNavigateToFamTube}>FamTube</Button>
                </div>
                 </div>
              
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
  )
}

export default FamZone