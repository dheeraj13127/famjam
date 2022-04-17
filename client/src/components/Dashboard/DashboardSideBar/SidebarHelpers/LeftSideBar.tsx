import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Sidebar,
  
  Divider,
  Button,
  Icon,
  Image,
  
  
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {ImFilm} from 'react-icons/im'
import {
  famFriendsType,
  leftSidebarType,
  myFamZonesDataType,
} from "../../../../redux/actionTypes/types";
import {
  getCurrentConversationId,
  getCurrentFriendMessage,
  getFamFriends,
  getIndividualConversation,
  getMyFamZones,
  setCurrentConversation,
} from "../../../../redux/actions";
import { famReducerState } from "../../../../redux/reducers";
import { useLocation, useNavigate } from "react-router-dom";

function LeftSideBar({
  visible,
  userData,
  message,
  setMessage,
  conversations,
  setActivateMessage,
  closeLeftSidebar,
  onlineUsers
 
}: leftSidebarType) {
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  const onlUsers=useSelector<famReducerState,famReducerState["onlUsers"]>(state=>state.onlUsers)
  const navigate=useNavigate()
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
    dispatch(getMyFamZones(famJamUserId))
  }, []);
  const myFamZonesData=useSelector<famReducerState,famReducerState["myFamZonesData"]>(state=>state.myFamZonesData)
  
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

  const checkActiveUser=(fid:any)=>{
  
      let res=onlUsers&&onlUsers.filter((f:any)=>fid===f.userId)
      if(res&&res.length>0){
        return true
      }
      else{
        return false
      }
    
  }

  const navigateToFamzone=(fzId:string)=>{
    
    window.location.href=`/famZone/${fzId}`
  }

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
               
                <Menu.Item
                  link
                  className="dashboardSidebarMenuItem dashboardSidebarFriendMenuItem"
                >
                  <Button className="famZoneButton" color="purple" fluid>
                    Fam Zone <ImFilm className="famZoneIcon"/>
                  </Button>
                  <a href="/dashboard/createFamZone">
                    <Button
                      color="grey"
                      basic
                      className="dahboardSidebarAddChannelBtn"
                    >
                      <Icon name="add" />
                      New Fam Zone
                    </Button>
                  </a>
                </Menu.Item>
                {
                  myFamZonesData&&myFamZonesData.map((fzd:myFamZonesDataType,key:number)=>(
                    <Menu.Item key={key} link>
                    <div className="friendBtn" onClick={()=>navigateToFamzone(fzd._id)}>
                      
                      <span className="leftSidebarFamZoneIcon">{fzd.famZoneIcon}</span> 
                      <p className="friendName">{fzd.famZoneName}</p>
                    </div>
                    </Menu.Item>
                   
                  ))
                }
                
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
                
                {famFriendsData &&
                  famFriendsData.map((fr: famFriendsType, key: any) => (
                    
                    <Menu.Item key={key} link className="">
                      <div
                        className="friendBtn"
                        onClick={() => setChattingScenario(fr._id, fr)}
                      >
                        {
                          checkActiveUser(fr._id)?(
                            <span className="showActiveSpan"></span>
                          ):(
                            <span className="showInActiveSpan"></span>
                          )
                        }
                       
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
