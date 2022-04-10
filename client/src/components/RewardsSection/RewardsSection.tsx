import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RewardsSectionNavbar from "./RewardsSectionNavbar/RewardsSectionNavbar";
import { getUserProfile } from "../../redux/actions";
import { famReducerState } from "../../redux/reducers";
import {
  Header,
  Dimmer,
  Loader,
  Label,
  Grid,
  Button,
  Icon,
} from "semantic-ui-react";
import { Toaster } from "react-hot-toast";
import "../../styles/RewardsSectionStyles/RewardsSection.scss";
import { rewardsSectionData } from "./RewardsSectionData/RewardsSectionData";
import { rewardsSectionDataType } from "../../redux/actionTypes/types";
function RewardsSection() {
  const dispatch = useDispatch();
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  let userProfile = {
    userId: famJamUserId,
  };
  const famjamAuthToken = sessionStorage.getItem("famjamAuthToken");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile(userProfile));
  }, []);
  useEffect(() => {
    if (
      famjamAuthToken === "" ||
      famjamAuthToken === null ||
      famjamAuthToken === undefined
    ) {
      navigate("/signIn");
    }
  }, []);
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  return (
    <>
      <RewardsSectionNavbar />
      <div className="rewardsSectionContainer">
        {userData ? (
          <>
            <Header className="rewardsSectionHeader" textAlign="center" as="h3">
              <Label className="spinAndWinHeader" color="blue" size="huge">
                Redeem Fam Tags
              </Label>
            </Header>
            <Grid className="rewardsSectionGrid">
              <Grid.Row centered stretched>
                <Header
                  className="rewardsSectionFamiesCount"
                  as="h3"
                  color="black"
                >
                  Famies Available&nbsp;&nbsp;
                  <Button basic color="grey">
                    {userData && userData.famies}
                  </Button>
                </Header>
              </Grid.Row>
              <Grid.Row centered stretched>
                {rewardsSectionData.map(
                  (rd: rewardsSectionDataType, key: any) => (
                    <Grid.Column key={key} textAlign="center" computer={4} tablet={5} mobile={10}>
                      <div className="rewardCards">
                        <Header className="rewardCardHeader" as="h4">
                          {rd.title}
                        </Header>
                        <p className="rewardCardIcon">{rd.icon}</p>

                        <Button
                          className="rewardCardPrice"
                          icon
                          labelPosition="right"
                        >
                          <Icon name="gift" color="violet" />
                          {rd.price}
                        </Button>
                        <p></p>
                        <Button color="violet" fluid>Redeem</Button>
                      </div>
                    </Grid.Column>
                  )
                )}
              </Grid.Row>
            </Grid>
          </>
        ) : (
          <Dimmer active className="noMessageLoader">
            <Loader>Loading...</Loader>
          </Dimmer>
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default RewardsSection;
