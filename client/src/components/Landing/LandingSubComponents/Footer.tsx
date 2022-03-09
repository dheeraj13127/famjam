import React from 'react'
import { Grid, Header, Image,Card, Icon } from 'semantic-ui-react'
import dynameto from '../../../assets/logos/dynameto.png'
import '../../../styles/LandingStyles/Footer.scss'
import famjam from '../../../assets/logos/famjamnew.png'
function Footer() {
  return (
    <div className='footerContainer'>
    <Grid>
        <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={8} textAlign="center" >
              
                <Image centered src={famjam} size='small' />
            
            <Card link href='https://dynameto.netlify.app/' target="__blank" centered className='footerMailCard'>
              <Card.Content>
                <Image floated="right" size="mini" src={dynameto} />
                <Card.Header className='footerCardContent'>Powered by Dynameto</Card.Header>
                <Card.Meta className='footerCardContent'>dynametocompany@gmail.com</Card.Meta>
              </Card.Content>
            </Card>
            </Grid.Column>
          
            <Grid.Column computer={8} mobile={16} tablet={8} className="footerConnect" textAlign="center">
                <Header as="h2" className='footerProducts'>Connect to us on</Header>
                <div className="handleLinksBoxFooter">
            <a href="https://github.com/dheeraj13127" target="_blank" className="ui basic button black handleLinks small">
              <Icon name="github" />
              Github
            </a>
            <a href="https://www.instagram.com/dheeraj_msdian/" target="_blank" className="ui basic button pink handleLinks small">
            <Icon name="instagram" />
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/dheerajs7/" target="_blank" className="ui basic button blue handleLinks small">
            <Icon name="linkedin" />
              LinkedIn
            </a>
            </div>
            </Grid.Column>
            <Grid.Column computer={16} mobile={16} tablet={16} textAlign='center'>
                <p className="footerCopyrights">Copyright <Icon name='copyright outline'/> 2022 FamJam</p>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    </div>
  )
}

export default Footer