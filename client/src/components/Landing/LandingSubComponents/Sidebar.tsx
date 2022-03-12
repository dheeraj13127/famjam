import React from "react";
import cn from "classnames";
import { Button, Grid } from "semantic-ui-react";
import '../../../styles/LandingStyles/Sidebar.scss'
type sidebarProps = {
  toggle: boolean;
};
function Sidebar(props: sidebarProps) {
  const classes = cn(
    "ui",
    "sidebar",
    "overlay",
    "top",
    "menu",
    "animating",
    "sidebarBack",
    { visible: props.toggle }
  );
  return (
    <div className="mobile only">
     
        <Grid className={classes}>
          <Grid.Row centered>
          <Grid.Column textAlign="center">
          <ul className="sidebarContent">
          <li className="item">
            <a href="/signIn"><Button fluid color="black">
              Sign In
            </Button></a>
          </li>
          <li className="item">
            <a href="/signIn"><Button fluid color="black">
              Sign Up
            </Button></a>
          </li>
        </ul>
          </Grid.Column>
          </Grid.Row>
          
        </Grid>
       
      
    </div>
  );
}

export default Sidebar;
