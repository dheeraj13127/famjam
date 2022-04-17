import React from 'react'
import { Button, Icon, Image, Menu } from 'semantic-ui-react'
import famjam from "../../../assets/logos/famjamnew.png";
function EditProfileNavbar() {
  return (
    <>
<Menu size="small" borderless className="dashboardSidebarNav">
        <Menu.Menu>
          <Menu.Item className="landingNavBrandImageBox">
            <Image
              size="small"
              src={famjam}
              alt="famjam"
              centered
              className="ui image dashboardSidebarNavBrandImage"
            />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            <a href="/dashboard">
              <Button size="mini" className="landingNavAuthBtns">
                <Icon name="arrow left" />
                Dashboard
              </Button>
            </a>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default EditProfileNavbar