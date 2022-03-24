import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Dimmer, Header, Image, Loader } from 'semantic-ui-react';
import { famReducerState } from '../../../../redux/reducers';
import '../../../../styles/ChatComponentStyles/NoMessage.scss'
function NoMessage() {
    let userData = useSelector<famReducerState, famReducerState["userData"]>((state) => state.userData);
  return (
      <>
      {
          userData?(
            <div className="noMessageContainer">
            <Image centered circular src={userData&&userData.profilePicUrl} size="small"/>
            <Header as="h2" textAlign="center" className='noMessageHeader'>Welcome to FamJam {userData.firstName} ❤️</Header>
            <div className="noMessageButtonContainer">
            <Button primary>To start the converation click on any of your fam-friends 🤝</Button>
            </div>
          
        </div>
          ):
          (
            <Dimmer active className="noMessageLoader">
            <Loader>Loading...</Loader>
            </Dimmer>
          )
      }
    </>
  )
}

export default NoMessage