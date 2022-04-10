import React from "react";
import { Grid, Image, Header, Icon, Button } from "semantic-ui-react";
import "../../../styles/LandingStyles/HeroSection.scss";
import landingHero from "../../../assets/other/heroLanding.png";
import Typist from "react-text-typist";
import { motion } from "framer-motion";
import famjam from '../../../assets/logos/famjamlogo.png'

function HeroSection() {
  const bombVar = {
    animate1: {
      y: [-5, 5],

      transition: {
        y: {
          yoyo: Infinity,
          duration: 0.5,
        },
      },
    },
  };
  return (
    <div className="heroSectionContainer">
      <Grid>
        <Grid.Row className="heroSectionRow" centered>
          <Grid.Column
            computer={8}
            mobile={12}
            className="mobile hidden tablet hidden"
            textAlign="center"
          >
            <Header as="h1" textAlign="center" className="heroSectionHeader">
            <span style={{color:"#5227D1"}}>Welcome to</span> &nbsp; 
              <Typist
                sentences={[`FamJam `]}
                loop={true}
                typingSpeed={80}
                deletingSpeed={80}
                cursorSmooth={true}
              />
             

            </Header>
            <Header as="h3" className="headerSectionInfo">
                Wanna connect to your family and friends in a unique and fun way ?
              </Header>
              <Header as="h3" className="headerSectionInfo">
                Daily win famies <Icon color="violet" size="tiny" name="gift" />and convert it to rewards
              </Header>
              <Header as="h3" className="headerSectionInfo">
                What are you waiting for ? Just the hit the button below
              </Header>
              <motion.div variants={bombVar} animate="animate1">
                <Image
                  src={famjam}
                  centered
                  className="arrowDownImg"
                  size="tiny"
                />
              </motion.div>

              <a href="/signIn"><Button size="medium" className="heroSectionAuthBtn">Let's Go</Button></a>
          </Grid.Column>
          <Grid.Column
            computer={8}
            mobile={12}
            textAlign="center"
            className="heroSectionHeroImageBox"
          >
            <Image src={landingHero} className="heroSectionHeroImage" />
          </Grid.Column>
          <Grid.Column
            computer={8}
            mobile={12}
            className="mobile tablet only computer hidden"
            textAlign="center"
          >
            <Header as="h1" textAlign="center" className="heroSectionHeader">
            <span style={{color:"#5227D1"}}>Welcome to</span> &nbsp;<br/> 
              <Typist
                sentences={[`FamJam `]}
                loop={true}
                typingSpeed={80}
                deletingSpeed={80}
                showCursor={false}
              />
            </Header>
            <Header as="h3" className="headerSectionInfo">
                Wanna connect to your family and friends in a unique and fun way ?
              </Header>
              <Header as="h3" className="headerSectionInfo">
                Daily win famies <Icon color="yellow" size="tiny" name="gift" /> and convert it to rewards
              </Header>
              <Header as="h3" className="headerSectionInfo">
                What are you waiting for ? Just the hit the button below
              </Header>
              <motion.div variants={bombVar} animate="animate1">
                <Image
                  src={famjam}
                  centered
                  className="arrowDownImg"
                  size="tiny"
                />
              </motion.div>

              <a href="/signIn"><Button size="medium" className="heroSectionAuthBtn">Let's Go</Button></a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default HeroSection;
