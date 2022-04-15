import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Loader,
  
} from "semantic-ui-react";
import { famReducerState } from "../../redux/reducers";
import "../../styles/AddFamFriendStyles/AddFamFriend.scss";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import {useDispatch} from 'react-redux'
import { sendFamFriendRequest } from "../../redux/actions";
function AddFamFriend() {
  const dispatch=useDispatch()
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  const [friendId,setFriendId]=useState<string>("")
  const updateFriendId=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFriendId(e.target.value)
  }
  const addFamFriend=(e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    dispatch(sendFamFriendRequest(friendId,userData))
    setFriendId("")
  }
  const onUserIdCopy = () => {
    copy(userData && userData._id);
    toast("Copied!", {
      icon: " 📎 ",
    });
  };

  const shareUrl = userData&&userData._id;
  const title = "FamJam User ID";
  return (
    <div className="addFamFriendContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
        
            computer={10}
            largeScreen={11}
            widescreen={11}
            mobile={16}
            tablet={16}
            
          >
               <Header textAlign="center" as="h3">
                        <Label className="spinAndWinHeader" color="blue" size="huge">
                        Add Fam Friend
                        </Label>
                        </Header>
            {userData ? (
              <div className="userShareProfileBox">
              <Label as='a' color="red" ribbon>Connect with your close friend</Label>
              
             
                <Image
                  centered
                  circular
                  size="small"
                  src={userData && userData.profilePicUrl}
                />
                
                <Header
                  textAlign="center"
                
                  className="userShareProfileHeader"
                >
                  To add new Fam Friend just share the below link
                </Header>
                <div className="userShareProfileId">
                  <Label size="large" as="a" color="blue" image className="IdShareHeader">
                    {userData && userData._id}
                    <Label.Detail onClick={onUserIdCopy}>
                      <Icon name="copy outline" />
                    </Label.Detail>
                  </Label>
                </div>
                <div className="userShareProfileWhatsappId">
                  <Label size="large" as="a" color="blue" image className="IdShareHeader">
                    Share on whatsapp
                    <Label.Detail onClick={onUserIdCopy}>
                      <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=" : "
                        className="Demo__some-network__share-button"
                      >
                        <WhatsappIcon size={15} round />
                      </WhatsappShareButton>
                    </Label.Detail>
                  </Label>
                </div>
                <Divider horizontal className="addFamFriendDivider">Or</Divider>
              <div className="addFamFriendInputBarBox">
                <Input fluid  placeholder="Enter FamJam Friend ID" value={friendId} onChange={updateFriendId}/>
                <div className="addFamFriendInputButton">
                <Button primary onClick={addFamFriend}>Add</Button>
                </div>
             
              </div>

           </div>
            ) : (
              <Dimmer active className="noMessageLoader">
                <Loader>Loading...</Loader>
              </Dimmer>
            )}
          
              
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default AddFamFriend;
