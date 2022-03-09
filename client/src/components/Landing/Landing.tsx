import React, { useState } from "react";
import { HeroSection, Navbar,Sidebar,FeaturesSection, ViewFamJam,Footer } from ".";
import cx from "classnames";

import "../../styles/LandingStyles/Landing.scss";

function Landing() {
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  const classes = cx("pusher", "bottom", "landingBackground");

  return (
    <div>
      <Navbar toggleMenu={toggleMenu} toggle={toggle} />
      <div className="pushable ui attached" style={{ height:"auto"}}>
        <Sidebar toggle={toggle} />
        <div className={classes}>
          <HeroSection/>
          <FeaturesSection/>
          <ViewFamJam/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Landing;
