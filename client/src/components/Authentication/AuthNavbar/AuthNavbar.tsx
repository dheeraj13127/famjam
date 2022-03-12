import React from 'react'
import {Menu,Image,Button} from 'semantic-ui-react'
import famjam from "../../../assets/logos/famjamnew.png";

function AuthNavbar() {
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
        <Menu.Menu position="right">
          <Menu.Item>
            <a href="/"><Button size="mini" className="landingNavAuthBtns">
              Home
            </Button></a>
          </Menu.Item>
          
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default AuthNavbar