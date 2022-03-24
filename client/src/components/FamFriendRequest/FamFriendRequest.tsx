import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Grid,
  Image,
  Label,
  Loader,
  Message,
} from "semantic-ui-react";
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
  return (
    <div className="famFriendRequestContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={12}
            mobile={16}
            tablet={16}
          >
            <div>
              {userData ? (
                <div className="famFriendRequestDataBox">
                  <Label as="a" color="red" ribbon>
                    Fam Friend Requests
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

                  <div className="RequestsBox">
                    {userData.famRequestsReceived.map(
                      (req: any, key: any) => (
                        <Message color="grey" >
                          <Image
                            circular
                            size="mini"
                            src={req && req.profilePic}
                          />
                          <Message.Header className="requestsProfileName">
                            {req&&req.userName}
                          </Message.Header>
                          <Button color="green" className="requestsButtons">
                            Accept
                          </Button>
                          <Button color="red" className="requestsButtons">
                            Reject
                          </Button>
                        </Message>
                      )
                    )}
                  </div>
                </div>
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
