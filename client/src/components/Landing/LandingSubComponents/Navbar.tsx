import React from "react";
import "../../../styles/LandingStyles/Navbar.scss";
import { Menu, Button, Image, Icon } from "semantic-ui-react";
import famjam from "../../../assets/logos/famjamnew.png";

type NavInput = {
  toggle: boolean;
  toggleMenu: () => void;
};
function Navbar(props: NavInput) {
  return (
    <div>
      <Menu size="small" borderless className="landingNav" fixed="top">
        <Menu.Item className="landingNavBrandImageBox">
          <Image
            size="small"
            src={famjam}
            alt="famjam"
            centered
            className="ui image landingNavBrandImage"
          />
        </Menu.Item>
        <Menu.Menu position="right" className="mobile hidden">
          <Menu.Item>
            <a href="/signIn"><Button size="mini" className="landingNavAuthBtns">
              Sign In
            </Button></a>
          </Menu.Item>
          <Menu.Item>
            <a href="/signUp"><Button size="mini" className="landingNavAuthBtns ">
              Sign Up
            </Button></a>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right" className="mobile only">
          <Menu.Item>
            {props.toggle ? (
              <Icon onClick={props.toggleMenu} name="close" />
            ) : (
              <Icon onClick={props.toggleMenu} name="bars" />
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
