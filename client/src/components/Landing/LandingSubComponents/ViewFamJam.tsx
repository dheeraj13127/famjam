import React from "react";
import "../../../styles/LandingStyles/ViewFamJam.scss";
import famjam from '../../../assets/logos/famjamlogo.png'
import { Grid,Header,Card,Image,Button, Embed } from "semantic-ui-react";
function ViewFamJam() {
  return (
    <div className="viewFamJamContainer">
      <Grid>
        <Grid.Row centered className="viewFamjamRow">
        <Grid.Column computer={16} textAlign="center" mobile={16} tablet={16}>
            <Header as="h1" className="featureSectionHeader">
              <span className="featuresSpan">Glimpse</span> of FamJam
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="center" computer={16} tablet={16} largeScreen={8} mobile={16} className="viewFamjamPlayerInfo" >
          
            <Embed
                active={true}
                id="_phRL9VUEzA"
                source="youtube"
                className="viewFamJamEmbed"
            />
          </Grid.Column>
          <Grid.Column computer={16} tablet={16} largeScreen={8} mobile={16} className="viewFamjamPlayerInfo">
            <Header as="h2" className="viewFamjamPlayerHeader">Want to experience it and go live ?</Header>
            <p className="viewFamjamPlayerHeaderInfo">Then rush into FamJam within no time !</p>
            <Card.Group>
            <Card centered className="viewFamJamCard mobile tablet only">
              <Card.Content>
                <Image floated="right" size="mini" src={famjam} />
                <Card.Header className="viewFamJamCardHeader">Already a FamJamian ?</Card.Header>
                <Card.Meta>Just hit the button below</Card.Meta>
                <a href="/signIn"><Button fluid size="medium" className="heroSectionAuthBtn">Sign In</Button></a>
              </Card.Content>
            </Card>
            <Card  centered className="viewFamJamCard mobile tablet only">
              <Card.Content>
                <Image floated="right" size="mini" src={famjam} />
                <Card.Header className="viewFamJamCardHeader">New to FamJam?</Card.Header>
                <Card.Meta>Just hit the button below</Card.Meta>
                <a href="/signUp"><Button fluid size="medium" className="heroSectionAuthBtn">Sign Up</Button></a>
              </Card.Content>
            </Card>
            <Card  className="viewFamJamCard mobile hidden tablet hidden ">
              <Card.Content>
                <Image floated="right" size="mini" src={famjam} />
                <Card.Header className="viewFamJamCardHeader">Already a FamJamian ?</Card.Header>
                <Card.Meta>Just hit the button below</Card.Meta>
                <a href="/signIn"><Button fluid size="medium" className="heroSectionAuthBtn">Sign In</Button></a>
              </Card.Content>
            </Card>
            <Card   className="viewFamJamCard mobile hidden tablet hidden">
              <Card.Content>
                <Image floated="right" size="mini" src={famjam} />
                <Card.Header className="viewFamJamCardHeader">New to FamJam?</Card.Header>
                <Card.Meta>Just hit the button below</Card.Meta>
                <a href="/signUp"><Button fluid size="medium" className="heroSectionAuthBtn">Sign Up</Button></a>
              </Card.Content>
            </Card>
            </Card.Group>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ViewFamJam;
