import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Image,
  Label,
  Loader,
  Message,
  Popup,
} from "semantic-ui-react";
import { famFriendsType, rewardsSectionDataType } from "../../redux/actionTypes/types";
import { famReducerState } from "../../redux/reducers";
import "../../styles/FamFriendsDisplayStyles/FamFriendsDisplay.scss";
function FamFriendsDisplay() {
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  const famFriendsData = useSelector<
    famReducerState,
    famReducerState["famFriendsData"]
  >((state) => state.famFriendsData);
  const validateFamtagsColors=(id:any)=>{
    if(id==="teal"){
      return "teal"
    }
    else if(id==="green"){
      return "green"
    }
    else if(id==="orange"){
      return "orange"
    }
    else if(id==="yellow"){
      return "yellow"
    }
    else if(id==="brown"){
      return "brown"
    }
    else if(id==="olive"){
      return "olive"
    }
    else if(id==="purple"){
      return "purple"
    }
    else if(id==="violet"){
      return "violet"
    }
    else{
      return "pink"
    }
  }

  return (
    <div className="famFriendsDisplayContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={11}
            mobile={15}
            tablet={16}
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
                      Fam Friends
                    </Label>
                  </Header>
                  <div className="famFriendsDataBox">
                    <Label as="a" color="red" ribbon>
                      Your Fam Friends
                    </Label>
                    {famFriendsData.length===0?(
                      <Message className="famfriendsDisplayNoFriends" color="purple">You don't have any fam friends yet.</Message>
                    ):(famFriendsData.map((fr: famFriendsType, key: any) => (
                      <Message key={key} color="black">
                        <Image
                          
                          circular
                          size="mini"
                          src={fr && fr.profilePicUrl}
                        />
                        <Message.Header className="requestsProfileName">
                          {fr && fr.userName}
                        </Message.Header>
                        <div className="friendsBadgeContainer">
                        {
                fr&&fr.famTags.map((ft:rewardsSectionDataType,key:any)=>(
                <Popup key={key} size="mini"  content={ft.title} trigger={<Label className="friendsBadge" content={ft.icon} tag color={validateFamtagsColors(ft.color)}/>}/>
              ))  
            }
                        </div>
                       
                        <Button  className="friendRemoveButton">
                          Remove friend
                        </Button>
                      </Message>
                    )))}
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
  );
}

export default FamFriendsDisplay;
