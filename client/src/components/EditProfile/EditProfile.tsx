import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dimmer,
  Grid,
  Icon,
  Image,
  Input,
  Label,
  Loader,

} from "semantic-ui-react";
import { avatars } from "../../assets/avatars/Avatars";
import { getUserProfile, userProfileEdit } from "../../redux/actions";
import { famReducerState } from "../../redux/reducers";

import "../../styles/EditProfileStyles/EditProfile.scss";
import { useNavigate } from "react-router-dom";
import { avatarset2 } from "../../assets/avatars/AvatarSet2";
import { avatarset3 } from "../../assets/avatars/AvatarSet3";
import EditProfileNavbar from "./EditProfileNavbar/EditProfileNavbar";
import { profile } from "console";
import { Toaster } from "react-hot-toast";
function EditProfile() {
  const dispatch = useDispatch();
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  let userProfile = {
    userId: famJamUserId,
  };
  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile(userProfile));
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
  const [showAvatar, setShowAvatar] = useState<boolean>(false);
  const [selectedAvatar,setSelectedAvatar]=useState<string>("")
  const [enableInput,setEnableInput]=useState<boolean>(true)
  const [newUserName,setNewUserName]=useState<string>("")
  const selectAvatar=(av:string)=>{
    setSelectedAvatar(av)
  }
  const modifyShowAvatar=()=>{
    setShowAvatar(!showAvatar)
  }
  const activateEnableInput=(val:string)=>{
    if(val==="active"){
      setEnableInput(false)
    }
    else{
      setEnableInput(true)
    }
   
  }
  const onUserNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setNewUserName(e.target.value)
  }
  let un=userData&&userData.userName
  let pu=userData&&userData.profilePicUrl
  const submitUpdatedProfile=(e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    let newUn=newUserName===""?un:newUserName
    let newPu=selectedAvatar===""?pu:selectedAvatar
    dispatch(userProfileEdit(famJamUserId,newUn,newPu))
  }
  return (
    <>
      <EditProfileNavbar/>
      <div className="editProfileContainer">
        {userData ? (
          <Grid className="editProfileColumn">
            <Label as="a" color="red" ribbon>
              Edit Profile
            </Label>
            <Grid.Row centered stretched>
              <Grid.Column textAlign="center" computer={16}>
                <Image src={selectedAvatar===""?userData.profilePicUrl:selectedAvatar} size="small" centered/>
                <div>
                <Button onClick={modifyShowAvatar}  className="editProfileSelectAvatarbtn">{showAvatar?"Done":`Change Avatar`}</Button>
                </div>
              
              </Grid.Column>
            </Grid.Row>
            {showAvatar && (
              <Grid.Row className="avatarRow">
                {avatars.map((av: string, key: any) => (
                  <Grid.Column key={key} computer={2} largeScreen={1} mobile={4}>
                    <div
                      onClick={() => selectAvatar(av)}
                      key={key}
                      className="avatarContainer"
                    >
                      <Image centered size="tiny" circular src={av} />
                    </div>
                  </Grid.Column>
                ))}
                {avatarset2.map((av: string, key: any) => (
                  <Grid.Column key={key} computer={2} largeScreen={1} mobile={4}>
                    <div
                      onClick={() => selectAvatar(av)}
                      key={key}
                      className="avatarContainer"
                    >
                      <Image centered size="tiny" circular src={av} />
                    </div>
                  </Grid.Column>
                ))}
                {avatarset3.map((av: string, key: any) => (
                  <Grid.Column key={key} computer={2} largeScreen={1} mobile={4}>
                    <div
                      onClick={() => selectAvatar(av)}
                      key={key}
                      className="avatarContainer"
                    >
                      <Image centered size="tiny" circular src={av} />
                    </div>
                  </Grid.Column>
                ))}
              </Grid.Row>
            )}
           <Grid.Row>
             <Grid.Column textAlign="center">
                  <Input value={newUserName} onChange={onUserNameChange} className="editProfileUserName" placeholder={userData.userName} disabled={enableInput}/>
                  {
                    !enableInput?(
                      <Button className="userNameEditBtn" onClick={()=>activateEnableInput("inactive")}>Done</Button>
                    ):(
                      <Button className="userNameEditBtn" icon onClick={()=>activateEnableInput("active")}><Icon name="pencil alternate" /></Button>
                    )
                  }
                  <div>
                    <Button className="editProfileSubmitBtn" onClick={submitUpdatedProfile} primary>Submit</Button>
                  </div>
             </Grid.Column>
           </Grid.Row>
          </Grid>
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

export default EditProfile;
