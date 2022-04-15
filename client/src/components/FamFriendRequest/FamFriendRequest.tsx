import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Image,
  Label,
  Loader,
  Message,
} from "semantic-ui-react";
import { acceptFamFriendRequest, deleteFamFriendRequest } from "../../redux/actions";
import { famReducerState } from "../../redux/reducers";
import "../../styles/FamFriendRequestStyles/FamFriendRequest.scss";
function FamFriendRequest() {
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  
  const [visible, setVisible] = useState(true);
  const onFamJamThoughtsDismiss = () => {
    setVisible(false);
  };
  const dispatch=useDispatch()
  const onRejectRequest=(userId:string,friendId:string)=>{
      dispatch(deleteFamFriendRequest(userId,friendId))
  }
  const onAcceptRequest=(userId:string,friendId:string)=>{
    dispatch(acceptFamFriendRequest(userId,friendId))
}
  return (
    <div className="famFriendRequestContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={11}
            mobile={16}
            tablet={16}
          >
            <div>
              {userData ? (
                <>
                 <Header textAlign="center" as="h3">
                        <Label className="spinAndWinHeader" color="blue" size="huge">
                        Fam Friend Requests
                        </Label>
                        </Header>
                        <div className="famFriendRequestDataBox">
                  <Label as="a" color="red" ribbon>
                    Choose a wise friend
                  </Label>
                  <Image
                    centered
                    circular
                    size="small"
                    src={userData && userData.profilePicUrl}
                  />
                  {visible && (
                    <Message color="violet" className="FamJamThoughts" onDismiss={onFamJamThoughtsDismiss}>
                      <Message.Header>FamJam Thoughts</Message.Header>
                      <p>
                        “Having somewhere to go is home. Having someone to love
                        is family. And having both is a blessing.”
                      </p>
                    </Message>
                  )}
                  {
                    userData.famRequestsReceived.length!==0?(
                      <div className="RequestsBox">
                      {userData.famRequestsReceived.map(
                        (req: any, key: any) => (
                          <Message key={key} color="black" >
                            <Image
                              circular
                              size="mini"
                              src={req && req.profilePic}
                            />
                            <Message.Header className="requestsProfileName">
                              {req&&req.userName}
                            </Message.Header>
                            <Button color="green" className="requestsButtons" onClick={()=>onAcceptRequest(userData._id,req._id)}>
                              Accept
                            </Button>
                            <Button color="red" className="requestsButtons" onClick={()=>onRejectRequest(userData._id,req._id)}>
                              Reject
                            </Button>
                          </Message>
                        )
                      )}
                    </div>
                    ):(
                      <Message  color="black" className="FamJamThoughts">
                      <Message.Header className="messageHeader">You dont have any Fam Friend Requests</Message.Header>
                      {/* <p>
                        “Having somewhere to go is home. Having someone to love
                        is family. And having both is a blessing.”
                      </p> */}
                    </Message>
                    )
                  }
                
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

export default FamFriendRequest;
