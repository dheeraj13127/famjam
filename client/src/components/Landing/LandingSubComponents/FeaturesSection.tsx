import React from "react";
import ParticlesBg from "particles-bg";
import "../../../styles/LandingStyles/FeaturesSection.scss";
import {featuresData} from './featuresData/FeaturesData'
import { Grid, Header, Card, Icon,Button } from "semantic-ui-react";

function FeaturesSection() {
  return (
    <div className="featuresSectionContainer">
      
      <Grid>

        <Grid.Row centered>
          <Grid.Column computer={6} textAlign="center" mobile={16} tablet={16}>
            <Header as="h1" className="featureSectionHeader">
              FamJam <span className="featuresSpan">Features</span>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <ParticlesBg type="polygon" bg={true} />
        <Grid.Row stretched centered>

            {featuresData.map((feat,key)=>(
                <>
                 <Grid.Column computer={4} mobile={16} tablet={8} textAlign="center">
            <Card centered className="featuresSectionCard">
              <img
                src={feat.imgUrl}
                alt="features"
                className="featuresSectionImage"
              />
              <Card.Content>
                <Card.Header className="cardHeader">{feat.name}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <a href="/">
                  <Button fluid className="featuresSectionGoBtn">{feat.info}</Button>
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
                </>
            ))}
         
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default FeaturesSection;
