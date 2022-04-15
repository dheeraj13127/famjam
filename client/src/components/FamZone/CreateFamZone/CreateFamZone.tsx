import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Checkbox, Dimmer, Dropdown, Grid, Header, Image, Input, Label, Loader, Message } from 'semantic-ui-react'
import { famFriendsType } from '../../../redux/actionTypes/types';
import { famReducerState } from '../../../redux/reducers';
import '../../../styles/FamZoneStyles/CreateFamZone.scss'
import toast from 'react-hot-toast'
import { famZoneIconData, famZoneIconType } from './FamZoneIconData/FamZoneIconData';
function CreateFamZone() {

  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  const famFriendsData = useSelector<
    famReducerState,
    famReducerState["famFriendsData"]
  >((state) => state.famFriendsData);

  const [selectedFriends,setSelectedFriends]=useState<any>([])
  const [selectedFamZoneIcon,setSelectedFamZoneIcon]=useState<string>("")
  const onSelectFriends=(id:any)=>{
   
    if(selectedFriends.length>3){
      toast.error("Maximum upto 4 can be selected")
    }
    else{
      setSelectedFriends((newId:any)=>[...newId,id])
    }
   
  }
  const selectedFriend=(id:any)=>{
    let res=selectedFriends.includes(id)
    return res
  }
  const removeFriend=(id:any)=>{
    setSelectedFriends(selectedFriends.filter((frd:any)=>frd!==id))
  }
 
  return (
    <div className='createFamZoneContainer'>
       <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={7}
            widescreen={12}
            mobile={16}
            tablet={12}
          >
            <div>
              {userData ? (
                <>
                  <Header textAlign="center" as="h3">
                    <Label
                      className="spinAndWinHeader"
                      color="blue"
                      size="huge"
                    >
                      Create Fam Zone
                    </Label>
                  </Header>
                  <div className="createFamZoneBox">
                    <Label as="a" color="red" ribbon>
                      Create one and chill there!
                    </Label>
                   <div className="createFamZoneForm">
                   <Input icon="users" className="createFamZoneInputs" iconPosition='left' fluid  placeholder="Enter Fam Zone name"/>
                   <Message color='black' content={selectedFamZoneIcon===""?"Select your Fam Zone Icon":`You have choosen ${selectedFamZoneIcon}`} className='famZoneFriendLabelInfo'/>
                   {
                     famZoneIconData.map((fz:famZoneIconType)=>(
                        <Label className='famZoneIcons' circular key={fz.id} color="grey" onClick={()=>setSelectedFamZoneIcon(fz.icon)} >
                          {fz.icon}
                        </Label>
                     ))
                   }
                   <Message color='purple' content="Select maximum upto 4 friends" className='famZoneFriendLabelInfo'/>
                  
                    {
                      famFriendsData&&famFriendsData.map((fr:famFriendsType,key:number)=>(
                        <div key={key}>
                         <Message onClick={()=>selectedFriend(fr._id)?removeFriend(fr._id):onSelectFriends(fr._id)} success={selectedFriend(fr._id)?true:false} size="mini" className='famZoneFriendLabel'  color="black">
                        <Image
                          
                          circular
                          size="mini"
                          src={fr && fr.profilePicUrl}
                        />
                        <Message.Header className="requestsProfileName" >
                          {fr && fr.userName}
                        </Message.Header>

                      </Message>

                        </div>
                      
                      ))
                    }
                    <Header textAlign='center'>
                        <Button>Create</Button>
                      </Header>
                   </div>
                  </div>
                </>
              ) : (
                <Dimmer active className="noMessageLoader">
                  <Loader>Loading...</Loader>
                </Dimmer>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default CreateFamZone