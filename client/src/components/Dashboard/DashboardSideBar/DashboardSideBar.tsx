import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  Icon,
  Input,
  Image,
  Button,
  Label,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { motion } from "framer-motion";
import "../../../styles/DashboardStyles/DashboardSidebar.scss";
import famjam from "../../../assets/logos/famjamnew.png";
import { userDataType } from "../../../redux/actionTypes/types";
import fortuneWheel from "../../../assets/other/fortuneWheel.png";
import IoMdAddCircleOutline from "react-icons/io";
function DashboardSideBar(props: userDataType) {
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
      <Menu size="small" borderless className="dashboardSidebarNav" fixed="top">
        <Menu.Menu position="left" className="mobile only">
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
        <Menu.Menu position="right" className="mobile only">
          <Menu.Item>
            <Icon
              size="large"
              onClick={rightToggleVisible}
              name="user circle"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Sidebar.Pushable className="mobile hidden dashboardSidebarBox">
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
          <Menu.Item link className="dashboardSidebarMenuItem">
            <Input placeholder="Search" />
          </Menu.Item>
          <Menu.Item link className="dashboardSidebarMenuItem">
            <Button color="blue" fluid>
              Channels
            </Button>
            <Button color="grey" basic  className="dahboardSidebarAddChannelBtn">
         
              <Icon name="add"/>
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
            <Button color="grey" basic  className="dahboardSidebarAddChannelBtn">
         
              <Icon name="add"/>
              Add Fam Friend
            </Button>
          </Menu.Item>
          <Divider inverted />
          <Menu.Item link>
          <Button color="grey" basic fluid className="friendBtn">
          <Image
                  
                  src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  circular
                  size="mini"
                  className="friendImage"
                />
                 <p className="friendName">Dhoni</p>
            </Button>
          </Menu.Item>
          <Menu.Item link>
          <Button color="grey" basic fluid className="friendBtn">
          <Image
                  
                  src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                  circular
                  size="mini"
                  className="friendImage"
                />
             <p className="friendName">Rohit</p>
            </Button>
          </Menu.Item>
        </Sidebar>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={!rightVisible}
          icon="labeled"
          vertical
          inverted
          className="dashboardSidebarRightMenu"
          direction="right"
        >
          {props.userData && (
            <>
              <Menu.Item link className="dashboardSidebarMenuItem">
                <Image
                  centered
                  src={props.userData && props.userData.profilePicUrl}
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
                <Button as="div" labelPosition="right" fluid>
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
                <Button as="div" labelPosition="right" fluid>
                  <Button color="blue">Fam friends</Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {props.userData.famFriends.length}
                  </Label>
                </Button>
              </Menu.Item>
              <Menu.Item link className="dashboardSidebarMenuItem">
                <Button as="div" labelPosition="right" fluid>
                  <Button color="blue">Fam requests</Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {props.userData.famRequestsReceived.length}
                  </Label>
                </Button>
              </Menu.Item>
              <Menu.Item link className="dashboardSidebarMenuItem">
                <Button as="div" labelPosition="right" fluid>
                  <Button color="blue">
                    <motion.div
                      animate={{
                        opacity: 1,
                      }}
                      initial={{
                        opacity: 0.1,
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
                <Button color="grey" fluid>
                  <Icon name="sign out" />
                  Sign Out
                </Button>
              </Menu.Item>
              <Menu.Item className="dashboardSidebarMenuItem"></Menu.Item>
            </>
          )}
        </Sidebar>
        <Sidebar.Pusher>
          <div></div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <Sidebar.Pushable className="mobile only dashboardSidebarBox">
      <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={visible}
          icon="labeled"
          vertical
          inverted
          className="dashboardSidebarLeftMenu"
        >
          <Menu.Item link className="dashboardSidebarMenuItem">
            <Input placeholder="Search" />
          </Menu.Item>
          <Menu.Item link className="dashboardSidebarMenuItem">
            <Button color="blue" fluid>
              Channels
            </Button>
            <Button color="grey" basic  className="dahboardSidebarAddChannelBtn">
         
              <Icon name="add"/>
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
            <Button color="grey" basic  className="dahboardSidebarAddChannelBtn">
         
              <Icon name="add"/>
              Add Fam Friend
            </Button>
          </Menu.Item>
          <Divider inverted />
          <Menu.Item link>
          <Button color="grey" basic fluid className="friendBtn">
          <Image
                  
                  src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  circular
                  size="mini"
                  className="friendImage"
                />
                 <p className="friendName">Dhoni</p>
            </Button>
          </Menu.Item>
          <Menu.Item link>
          <Button color="grey" basic fluid className="friendBtn">
          <Image
                  
                  src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                  circular
                  size="mini"
                  className="friendImage"
                />
             <p className="friendName">Rohit</p>
            </Button>
          </Menu.Item>
        </Sidebar>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={rightVisible}
          icon="labeled"
          vertical
          inverted
          className="dashboardSidebarRightMenu"
          direction="right"
        >
          {props.userData && (
            <>
              <Menu.Item link className="dashboardSidebarMenuItem">
                <Image
                  centered
                  src={props.userData && props.userData.profilePicUrl}
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
                <Button as="div" labelPosition="right" fluid>
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
                <Button as="div" labelPosition="right" fluid>
                  <Button color="blue">Fam friends</Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {props.userData.famFriends.length}
                  </Label>
                </Button>
              </Menu.Item>
              <Menu.Item link className="dashboardSidebarMenuItem">
                <Button as="div" labelPosition="right" fluid>
                  <Button color="blue">Fam requests</Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {props.userData.famRequestsReceived.length}
                  </Label>
                </Button>
              </Menu.Item>
              <Menu.Item link className="dashboardSidebarMenuItem">
                <Button as="div" labelPosition="right" fluid>
                  <Button color="blue">
                    <motion.div
                      animate={{
                        opacity: 1,
                      }}
                      initial={{
                        opacity: 0.1,
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
                <Button color="grey" fluid>
                  <Icon name="sign out" />
                  Sign Out
                </Button>
              </Menu.Item>
              <Menu.Item className="dashboardSidebarMenuItem"></Menu.Item>
            </>
          )}
        </Sidebar>
        <Sidebar.Pusher>
          <div></div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

export default DashboardSideBar;
