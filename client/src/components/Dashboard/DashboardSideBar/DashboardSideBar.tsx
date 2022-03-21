import React, { useState } from "react";
import { Sidebar, Menu, Icon, Image, Input, Header } from "semantic-ui-react";
import "../../../styles/DashboardStyles/DashboardSidebar.scss";
import famjam from "../../../assets/logos/famjamnew.png";
import { userDataType } from "../../../redux/actionTypes/types";

import { LeftSideBar,RightSideBar } from "..";
function DashboardSideBar(props: any) {
  const [visible, setVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };
  const rightToggleVisible = () => {
    setRightVisible(!rightVisible);
  };
  return (
    <div>
      <Menu size="small" borderless className="dashboardSidebarNav">
        <Menu.Menu position="left" className="mobile only tablet only">
          <Menu.Item>
            {visible ? (
              <Icon onClick={toggleVisible} name="close" />
            ) : (
              <Icon onClick={toggleVisible} name="bars" />
            )}
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item className="landingNavBrandImageBox">
          <Image
            size="small"
            src={famjam}
            alt="famjam"
            centered
            className="ui image dashboardSidebarNavBrandImage"
          />
        </Menu.Item>
        <Menu.Menu position="right" className="mobile only tablet only">
          <Menu.Item>
            <Icon
              size="large"
              onClick={rightToggleVisible}
              name="user circle"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      
      <Sidebar.Pushable className="mobile hidden tablet hidden dashboardSidebarBox">
        <LeftSideBar  conversations={props.conversations} visible={visible} userData={props.userData} message={props.message} setMessage={props.setMessage} />
        <RightSideBar userData={props.userData} rightVisible={rightVisible} />
        <Sidebar.Pusher>
              {props.children}
           
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <Sidebar.Pushable className="mobile only tablet only dashboardSidebarBox">
        <LeftSideBar  conversations={props.conversations} visible={!visible} userData={props.userData} message={props.message} setMessage={props.setMessage}/>
        <RightSideBar userData={props.userData} rightVisible={!rightVisible}  />
        <Sidebar.Pusher>
          {props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

export default DashboardSideBar;
