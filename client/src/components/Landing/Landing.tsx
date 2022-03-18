import React, { useState } from "react";
import { HeroSection, Navbar,FeaturesSection, ViewFamJam,Footer } from ".";
import "../../styles/LandingStyles/Landing.scss";

function Landing() {
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setToggle(!toggle);
  };


  return (
    <div>
      <Navbar toggleMenu={toggleMenu} toggle={toggle} />
     
     
        <div className="landingBackground" >
          <HeroSection/>
          <FeaturesSection/>
          <ViewFamJam/>
        </div>
    
      <Footer/>
    </div>
  );
}

export default Landing;
