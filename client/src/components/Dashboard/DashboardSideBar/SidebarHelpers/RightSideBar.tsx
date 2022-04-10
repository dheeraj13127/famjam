import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Sidebar,
  Divider,
  Button,
  Icon,
  Image,
  Label,
  Popup,
} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import surpbox from "../../../../assets/other/surpbox.png";
import { motion } from "framer-motion";
import { rightSidebarType } from "../../../../redux/actionTypes/types";
import { userSignout } from "../../../../redux/actions";
import randomUser from "../../../../assets/other/randomUser.png";

function RightSideBar(props: rightSidebarType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSignout = () => {
    dispatch(userSignout(navigate));
  };
  let currentDay = new Date().getDay();

  const rightRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (rightRef.current && !rightRef.current.contains(event.target)) {
        props.closeRightSidebar && props.closeRightSidebar();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [props.closeRightSidebar]);
  const [showTags, setShowTags] = useState(false);
  return (
    <div ref={rightRef}>
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
                src={
                  props.userData.profilePicUrl !== ""
                    ? props.userData.profilePicUrl
                    : randomUser
                }
                circular
                size="mini"
              />
              <p className="dashboardSidebarMenuItemText">
                {props.userData.userName}
              </p>
            </Menu.Item>

            <Menu.Item link className="dashboardSidebarMenuItem">
              <a href="/editProfile">
                <Button color="grey" fluid>
                  <Icon name="edit" /> Edit
                </Button>
              </a>
            </Menu.Item>

            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="teal"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="green"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="orange"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="yellow"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="brown"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="olive"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="purple"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="violet"/>}/>
            <Popup size="mini"  content="Entertainer" trigger={<Label className="friendsBadge" content=" 🧑🏻‍🎤" tag color="pink"/>}/>

            <Divider inverted />
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right">
                <a className="famiesButton ui button primary" href="/redeem">
                  <img
                    className="dahsboardSidebarFamiesImg"
                    src={surpbox}
                    alt="famies"
                  />
                 
                  Famies
                </a>
                <Label as="a" basic color="blue" pointing="left">
                  {props.userData.famies}
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right">
                <a href="/dashboard/famFriends" className="ui button primary">
                  Fam friends
                </a>

                <Label as="a" basic color="blue" pointing="left">
                  {props.userData.famFriends.length}
                </Label>
              </Button>
            </Menu.Item>
            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button as="div" labelPosition="right">
                <a
                  className="ui button primary"
                  color="blue"
                  href="/dashboard/famFriendRequest"
                >
                  Fam requests
                </a>
                <Label
                  as="a"
                  basic
                  color={
                    props.userData.famRequestsReceived.length === 0
                      ? "blue"
                      : "red"
                  }
                  pointing="left"
                >
                  {props.userData.famRequestsReceived.length}
                </Label>
              </Button>
            </Menu.Item>

            <Menu.Item link className="dashboardSidebarMenuItem">
              <Button
                as="div"
                labelPosition="right"
                disabled={
                  props.userData.famiesDay === currentDay ? true : false
                }
              >
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
                <Label
                  as="a"
                  href="/dashboard/hitAndWin"
                  basic
                  color="blue"
                  pointing="left"
                >
                  {props.userData.famiesDay === currentDay
                    ? "Available on next day"
                    : "Hit and Win"}
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
        ) : (
          <></>
        )}
      </Sidebar>
    </div>
  );
}

export default RightSideBar;
