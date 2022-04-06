import React, { useEffect } from "react";
import {
  Menu,
  Sidebar,
  Divider,
  Button,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import surpbox from "../../../../assets/other/surpbox.png";
import { motion } from "framer-motion";
import { rightSidebarType } from "../../../../redux/actionTypes/types";
import { userSignout } from "../../../../redux/actions";
import randomUser from '../../../../assets/other/randomUser.png'
function RightSideBar(props: rightSidebarType) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onSignout=()=>{
        dispatch(userSignout(navigate))
    }
let currentDay=new Date().getDay()



  return (
    <>
      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={!props.rightVisible}
        icon="labeled"
        vertical
        inverted
        className="dashboardSidebarRightMenu"
        direction="right"
      >
        {props.userData ? (
          <>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Image
                centered
                src={props.userData.profilePicUrl!==""?props.userData.profilePicUrl:randomUser}
                circular
                size="mini"
              />
              <p className="dashboardSidebarMenuItemText">
                {props.userData.userName}
              </p>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <a href="/editProfile"><Button color="grey" fluid>
                <Icon name="edit" /> Edit
              </Button></a>
            </Menu.Item>
            <Divider inverted />
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right">
                <Button color="blue">
                  <Icon name="gift" color="yellow" />
                  Famies
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  {props.userData.famies}
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right" >
                <a href="/dashboard/famFriends" className="ui button primary" >
                Fam friends
                </a>
                
                <Label as="a" basic color="blue" pointing="left">
                  {props.userData.famFriends.length}
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              
              <Button as="div" labelPosition="right" >
                <a className="ui button primary" color="blue" href="/dashboard/famFriendRequest" >Fam requests</a>
                <Label as="a" basic color={props.userData.famRequestsReceived.length===0?"blue":"red"} pointing="left">
                  {props.userData.famRequestsReceived.length}
                </Label>
              </Button>
             
              
            </Menu.Item>
           
            <Menu.Item link  className="dashboardSidebarMenuItem">

              <Button as="div" labelPosition="right" disabled={props.userData.famiesDay===currentDay?true:false}>
                <Button color="blue">
                  <motion.div
                    animate={{
                      opacity: 1,
                    }}
                   
                    transition={{
                      duration: 2,
                    }}
                  >
                    <motion.img
                      className="dahsboardSidebarWheelImg"
                      src={surpbox}
                      animate={{ rotate: [-360, 360] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    ></motion.img>
                  </motion.div>
                </Button>
                <Label as="a" href="/dashboard/hitAndWin"  basic color="blue" pointing="left">
                  {
                    props.userData.famiesDay===currentDay?"Available on next day":"Hit and Win"
                  }
                
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button color="grey" fluid onClick={onSignout}>
                <Icon name="sign out" />
                Sign Out
              </Button>
            </Menu.Item>
            <Menu.Item className="dashboardSidebarMenuItem"></Menu.Item>
          </>
        ):(
         
           <></>
   
            
            
        )}
      </Sidebar>
    </>
  );
}

export default RightSideBar;
