import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Button, Dimmer, Grid, Header, Image, Input, Label, Loader, Message } from 'semantic-ui-react'
import { famFriendsType } from '../../../redux/actionTypes/types';
import { famReducerState } from '../../../redux/reducers';
import '../../../styles/FamZoneStyles/CreateFamZone.scss'
import toast from 'react-hot-toast'
import { famZoneIconData, famZoneIconType } from './FamZoneIconData/FamZoneIconData';
import { createNewFamZone } from '../../../redux/actions';
function CreateFamZone() {
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  const dispatch=useDispatch()
  const famFriendsData = useSelector<
    famReducerState,
    famReducerState["famFriendsData"]
  >((state) => state.famFriendsData);
  const [famZoneName,setFamZoneName]=useState("")
  const [selectedFriends,setSelectedFriends]=useState<any>([])
  const [selectedFamZoneIcon,setSelectedFamZoneIcon]=useState<string>("")
  const onSelectFriends=(id:any)=>{
   
    if(selectedFriends.length>2){
      toast.error("Maximum upto 3 can be selected")
    }
    else{
      setSelectedFriends((newId:any)=>[...newId,id])
    }
   
  }
  const onFamZoneNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setFamZoneName(e.target.value)
  }
  const selectedFriend=(id:any)=>{
    let res=selectedFriends.includes(id)
    return res
  }
  const removeFriend=(id:any)=>{
    setSelectedFriends(selectedFriends.filter((frd:any)=>frd!==id))
  }
  const onCreateFamZone=()=>{
    if(famZoneName===""){
      toast("Give a name to your famzone",{
        icon:"👇"
      })
    }
    else if(selectedFamZoneIcon===""){
      toast("Select the icon for your famzone",{
        icon:"👇"
      })
    }
    else if(selectedFriends.length!==3){
      toast("You need to select 3 friends",{
        icon:"👇"
      })
    }
    else{
      selectedFriends.push(famJamUserId)
      let famZoneData={
        famZoneMembers:selectedFriends,
        famZoneName:famZoneName,
        famZoneIcon:selectedFamZoneIcon,
        famZoneAdmin:famJamUserId
      }
      
      dispatch(createNewFamZone(famJamUserId,famZoneData))
    }
  }
 
  return (
    <div className='createFamZoneContainer'>
       <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={7}
            widescreen={11}
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
                   <Input onChange={onFamZoneNameChange} icon="users" className="createFamZoneInputs" iconPosition='left' fluid  placeholder="Enter Fam Zone name"/>
                   <Message color='black' content={selectedFamZoneIcon===""?"Select your Fam Zone Icon":`You have choosen ${selectedFamZoneIcon}`} className='famZoneFriendLabelInfo'/>
                   {
                     famZoneIconData.map((fz:famZoneIconType)=>(
                        <Label className='famZoneIcons' circular key={fz.id} color="grey" onClick={()=>setSelectedFamZoneIcon(fz.icon)} >
                          {fz.icon}
                        </Label>
                     ))
                   }
                   <Message color='black' content="Select maximum of 3 friends" className='famZoneFriendLabelInfo'/>
                  
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
                   {
                     famFriendsData&&famFriendsData.length===0&&(
                    <Message className='createFamZoneNoFriends' color='purple'>You don't have any fam friends yet.</Message>
                     )
                   } 
                    <Header textAlign='center'>
                        <Button onClick={onCreateFamZone}>Create</Button>
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