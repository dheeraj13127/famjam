import React from "react";
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
import fortuneWheel from "../../../../assets/other/fortuneWheel.png";
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
              <Button color="grey" fluid>
                <Icon name="edit" /> Edit
              </Button>
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
                <Button color="blue">Fam friends</Button>
                <Label as="a" basic color="blue" pointing="left">
                  {props.userData.famFriends.length}
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right" >
                <Button color="blue">Fam requests</Button>
                <Label as="a" basic color="blue" pointing="left">
                  {props.userData.famRequestsReceived.length}
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right" >
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
                      src={fortuneWheel}
                      animate={{ rotate: [-360, 360] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    ></motion.img>
                  </motion.div>
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  Spin & Win
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
