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
import { getCurrentFriendMessage, getFamFriends, setCurrentConversation } from "../../../../redux/actions";
import { famReducerState } from "../../../../redux/reducers";
function LeftSideBar({visible,userData}: leftSidebarType) {
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const dispatch=useDispatch()
  const famFriendsData=useSelector<famReducerState,famReducerState["famFriendsData"]>(state=>state.famFriendsData)
  useEffect(()=>{
    dispatch(getFamFriends(famJamUserId))
  },[])
  const userConversations=useSelector<famReducerState,famReducerState["userConversations"]>(state=>state.userConversations)

  const setChattingScenario=(id:string,fr:famFriendsType)=>{
    
    userConversations.map((cn:any)=>{
      cn.members.map((cnm:any)=>{
        if(cnm===id){
         
          dispatch(setCurrentConversation(cn._id))
          dispatch(getCurrentFriendMessage(fr))

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
        <Menu.Item link className="dashboardSidebarMenuItem">
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
        <Menu.Item link className="dashboardSidebarMenuItem">
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
            <Menu.Item key={key} link>
            <Button color="grey" basic fluid className="friendBtn" onClick={()=>setChattingScenario(fr._id,fr)}>
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
