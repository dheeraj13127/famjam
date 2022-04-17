import React, { useState } from "react";
import { HeroSection, Navbar,FeaturesSection, ViewFamJam,Footer } from ".";
import "../../styles/LandingStyles/Landing.scss";
import MouseParticles from 'react-mouse-particles'
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
      <MouseParticles g={1} color="random" cull="col,image-wrapper"/>
    </div>
  );
}

export default Landing;
