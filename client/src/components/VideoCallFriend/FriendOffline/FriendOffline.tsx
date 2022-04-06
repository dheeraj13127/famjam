import React from "react";
import { useSelector } from "react-redux";
import { Button, Header, Image, Message } from "semantic-ui-react";
import { famReducerState } from "../../../redux/reducers";
import {IoMdCall} from 'react-icons/io'
import { MdCallEnd } from "react-icons/md";
type friendOfflineType = {
  receivingCall: boolean;
  acceptCall:()=>void
};


function FriendOffline({ receivingCall,acceptCall }: friendOfflineType) {
    const friendData=useSelector<famReducerState,famReducerState["videoCallFriendData"]>(state=>state.videoCallFriendData)
    const onAcceptCall=()=>{
        acceptCall()
    }
    const onDeclineCall=()=>{
        window.location.href="/dashboard"
    }
  return (
    <div className="friendOfflineBox ">
      {
        friendData&&(
          <Header as="h3" textAlign="center">
          {receivingCall ? (
            <Message color="black">
              <Image centered circular src={friendData&&friendData.user.profilePicUrl} size="small"/>
              <Message.Header className="friendOfflineHeader">{friendData&&friendData.user.userName} is calling...</Message.Header>
              <div className="answerCallButtonBox">
              <Button color="green" onClick={onAcceptCall}><IoMdCall/></Button>
              <Button color="red" onClick={onDeclineCall}><MdCallEnd/></Button>
              </div>
              
  
  
            </Message>
          ) : (
            <Message color="black">
                <Image centered circular src={friendData&&friendData.user.profilePicUrl} size="small"/>
              <Message.Header className="friendOfflineHeader">{friendData&&friendData.user.userName} is not in the call</Message.Header>
            </Message>
          )}
        </Header>
        )
      }
     
    </div>
  );
}

export default FriendOffline;
