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
} from "semantic-ui-react";
import { famFriendsType } from "../../redux/actionTypes/types";
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
  console.log(famFriendsData);
  return (
    <div className="famFriendsDisplayContainer">
      <Grid>
        <Grid.Row centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={12}
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
                    {famFriendsData.map((fr: famFriendsType, key: any) => (
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
                        <Label as="a" className="friendsBadge" color="teal" tag>
                          Featured
                        </Label>
                        <Label as="a" className="friendsBadge" color="teal" tag>
                          Featured
                        </Label>
                        <Label as="a" className="friendsBadge" color="teal" tag>
                          Featured
                        </Label>
                        </div>
                       
                        <Button color="red" className="friendRemoveButton">
                          Remove friend
                        </Button>
                      </Message>
                    ))}
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
