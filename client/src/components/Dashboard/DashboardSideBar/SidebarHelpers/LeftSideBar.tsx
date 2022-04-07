import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Sidebar,
  Input,
  Divider,
  Button,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import {
  famFriendsType,
  leftSidebarType,
} from "../../../../redux/actionTypes/types";
import {
  getCurrentConversationId,
  getCurrentFriendMessage,
  getFamFriends,
  getIndividualConversation,
  setCurrentConversation,
} from "../../../../redux/actions";
import { famReducerState } from "../../../../redux/reducers";
import { useLocation } from "react-router-dom";

function LeftSideBar({
  visible,
  userData,
  message,
  setMessage,
  conversations,
  setActivateMessage,
  closeLeftSidebar
 
}: leftSidebarType) {
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const dispatch = useDispatch();
  const [backActive, setBackActive] = useState(false);
  const [currentChatId, setCurrentChatId] = useState("");
  const location = useLocation();
  const leftRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (leftRef.current && !leftRef.current.contains(event.target)) {
        closeLeftSidebar && closeLeftSidebar();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ closeLeftSidebar ]);
  useEffect(() => {
    currentChatId !== "" &&
      dispatch(setCurrentConversation(currentChatId, setMessage));
  }, [currentChatId]);
  const famFriendsData = useSelector<
    famReducerState,
    famReducerState["famFriendsData"]
  >((state) => state.famFriendsData);
  useEffect(() => {
    dispatch(getFamFriends(famJamUserId));
  }, []);

  const setChattingScenario = (id: string, fr: famFriendsType) => {
    conversations.map((cn: any) => {
      cn.members.map((cnm: any) => {
        if (cnm === id) {
          setCurrentChatId(cn._id);

          dispatch(getIndividualConversation(cn));
          dispatch(getCurrentFriendMessage(fr));
          dispatch(getCurrentConversationId(cn._id));
          setBackActive(!backActive);
        }
      });
    });
    setActivateMessage(true);
  };

  return (
    <div ref={leftRef}>
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
        {userData ? (
          <>
            {location.pathname !== "/dashboard" && (
              <Menu.Item link className="dashboardSidebarMenuItem">
                <a href="/dashboard">
                  <Button
                    color="grey"
                    basic
                    className="dahboardSidebarAddChannelBtn"
                  >
                    <Icon name="arrow left" />
                    Dashboard
                  </Button>
                </a>
              </Menu.Item>
            )}
            {location.pathname === "/dashboard" && (
              <>
                <Menu.Item link className="dashboardSidebarMenuItem">
                  <Input placeholder="Search" />
                </Menu.Item>
                <Menu.Item
                  link
                  className="dashboardSidebarMenuItem dashboardSidebarFriendMenuItem"
                >
                  <Button color="blue" fluid>
                    Channels
                  </Button>
                  <Button
                    color="grey"
                    basic
                    className="dahboardSidebarAddChannelBtn"
                  >
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
                <Menu.Item
                  link
                  className="dashboardSidebarMenuItem dashboardSidebarFriendMenuItem"
                >
                  <Button color="blue" fluid>
                    Private
                  </Button>
                  <a href="/dashboard/addFamFriend">
                    <Button
                      color="grey"
                      basic
                      className="dahboardSidebarAddChannelBtn"
                    >
                      <Icon name="add" />
                      Add Fam Friend
                    </Button>
                  </a>
                </Menu.Item>
                <Divider inverted />
                {famFriendsData &&
                  famFriendsData.map((fr: famFriendsType, key: any) => (
                    
                    <Menu.Item key={key} link className="">
                      <div
                        className="friendBtn"
                        onClick={() => setChattingScenario(fr._id, fr)}
                      >
                        <Image
                          src={fr.profilePicUrl}
                          circular
                          size="mini"
                          className="friendImage"
                        />
                        <p className="friendName">{fr.userName}</p>
                      </div>
                      
                    </Menu.Item>
                    
                
                  ))}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </Sidebar>
    </div>
  );
}

export default LeftSideBar;
