import React, { useEffect, useState } from "react";
import {
  Menu,
  Sidebar,
  Input,
  Divider,
  Button,
  Icon,
  Image,
 
} from "semantic-ui-react";
import {useDispatch,useSelector} from 'react-redux'

import { famFriendsType, leftSidebarType, userDataType } from "../../../../redux/actionTypes/types";
import { getCurrentConversationId, getCurrentFriendMessage, getFamFriends, getIndividualConversation, setCurrentConversation } from "../../../../redux/actions";
import { famReducerState } from "../../../../redux/reducers";
function LeftSideBar({visible,userData,message,setMessage,conversations}: leftSidebarType) {
  
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const dispatch=useDispatch()
  const [backActive,setBackActive]=useState(false)
  const [currentChatId,setCurrentChatId]=useState("")
  useEffect(()=>{
    currentChatId!==""&&dispatch(setCurrentConversation(currentChatId,setMessage))
   },[currentChatId])
  const famFriendsData=useSelector<famReducerState,famReducerState["famFriendsData"]>(state=>state.famFriendsData)
  useEffect(()=>{
    dispatch(getFamFriends(famJamUserId))
  },[])
 

  const setChattingScenario=(id:string,fr:famFriendsType)=>{

    conversations.map((cn:any)=>{
      cn.members.map((cnm:any)=>{
        if(cnm===id){
         setCurrentChatId(cn._id)
          dispatch(getIndividualConversation(cn))
          dispatch(getCurrentFriendMessage(fr))
          dispatch(getCurrentConversationId(cn._id))
          setBackActive(!backActive)
        }
      })
    })
    
  }

  return (
    <>
      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={!visible}
        icon="labeled"
        vertical
        inverted 
        
        className="dashboardSidebarLeftMenu"
      >
        {
          userData?(
            <>
            <Menu.Item link className="dashboardSidebarMenuItem">
          <Input placeholder="Search" />
        </Menu.Item>
        <Menu.Item link className="dashboardSidebarMenuItem dashboardSidebarFriendMenuItem">
          <Button color="blue" fluid>
            Channels
          </Button>
          <Button color="grey" basic className="dahboardSidebarAddChannelBtn">
            <Icon name="add" />
            Add Channel
          </Button>
        </Menu.Item>
        <Divider inverted />
        <Menu.Item link>
          <Button color="grey" fluid>
            # Channel1
          </Button>
        </Menu.Item>
        <Menu.Item link>
          <Button color="grey" fluid>
            # Channel2
          </Button>
        </Menu.Item>
        <Divider inverted />
        <Divider inverted />
        <Menu.Item link className="dashboardSidebarMenuItem dashboardSidebarFriendMenuItem">
          <Button color="blue" fluid>
            Private
          </Button>
          <Button color="grey" basic className="dahboardSidebarAddChannelBtn">
            <Icon name="add" />
            Add Fam Friend
          </Button>
        </Menu.Item>
        <Divider inverted />
        {
          famFriendsData&&famFriendsData.map((fr:famFriendsType,key:any)=>(
            <Menu.Item key={key} link className="">
            <Button color="grey" basic fluid className="friendBtn" toggle onClick={()=>setChattingScenario(fr._id,fr)}>
              <Image
                src={fr.profilePicUrl}
                circular
                size="mini"
                className="friendImage"
              />
              <p className="friendName">{fr.firstName}</p>
            </Button>
          </Menu.Item>
          ))
        }
       
            </>
          ):(
                <></>
           
          )
        }
        
       
        
        
      </Sidebar>
    </>
  );
}

export default LeftSideBar;
