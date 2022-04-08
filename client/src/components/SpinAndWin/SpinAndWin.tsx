import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 
  Dimmer,
  Grid,
  Header,
  Image,
  Label,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { famReducerState } from "../../redux/reducers";
import "../../styles/SpinAndWinStyles/SpinAndWin.scss";
import ConfettiExplosion from "react-confetti-explosion";
import surpbox from "../../assets/other/surpbox.png";
import surpboxopen from "../../assets/other/surpboxopen.png";
import { updateFamiesDay, updateNewFamies } from "../../redux/actions";


function SpinAndWin() {
  
  let userData = useSelector<famReducerState, famReducerState["userData"]>(
    (state) => state.userData
  );
  let day=new Date().getDay()
  let userDay=userData&&userData.famiesDay
 
  let famJamUserId = sessionStorage.getItem("famJamUserId");
  let oldFamies=userData&&userData.famies
  

  const [isExploding, setIsExploding] = useState(false);
  const dispatch=useDispatch()



    
 
    const findRandomFamies=()=>{
      let randomFamies=[5,10,15,20,25,30,35,50]
      let rand=Math.random()
      let randIndex=Math.floor(rand*randomFamies.length)
      return randomFamies[randIndex]
    }

    const onHitBox=()=>{
     
      setIsExploding(true)
      let nfamies=findRandomFamies()
      let newFamies=oldFamies+nfamies
      
      
      dispatch(updateNewFamies(famJamUserId,newFamies,nfamies))
      if(userDay!==6){
        dispatch(updateFamiesDay(famJamUserId,day))
      }
      else{
        dispatch(updateFamiesDay(famJamUserId,0))
      }
     
    }



  return (
    <div className="spinAndWinContainer">
      <Grid>
        <Grid.Row stretched centered>
          <Grid.Column
            computer={10}
            largeScreen={11}
            widescreen={12}
            mobile={16}
            tablet={16}
          >
            <div>
              {userData ? (
                <>
                  <Header textAlign="center" as="h3">
                    <Label className="spinAndWinHeader" color="blue" size="huge">
                      Hit and Win
                    </Label>
                  </Header>
                  <div className="spinAndWinSpinnerBox">
                    <Label as="a" color="red" ribbon>
                      Lets test your luck
                    </Label>

                    <div className="hitandWinBox">
                      <Segment
                        onClick={()=>onHitBox()}
                        raised
                        className="HitAndWinCard"
                      >
                        <div className="explosionBox">
                          {isExploding && (
                            <ConfettiExplosion particleCount={250} />
                          )}
                        </div>

                        {isExploding ? (
                          <Image
                            centered
                            className="hammerImg"
                            src={surpboxopen}
                          />
                        ) : (
                          <Image centered className="hammerImg" src={surpbox} />
                        )}

                        <Header textAlign="center" as="h3">
                          <Label color="violet" size="large">
                            {!isExploding?"Hit the fambox to earn famies":"It was solid hit"}
                          </Label>
                        </Header>
                      </Segment>
                    </div>
                      {
                        isExploding&&(
                          <div className="winMessageBox">
                          <Message color="black" className="FamJamThoughts" >
                           <Header textAlign="center"><Label color="violet" size="large">Congratulations</Label></Header> 
                            <p className="winMessageBoxText">
                             Wohoo! You have won famies
                            </p>
                          </Message>
                          </div>
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

export default SpinAndWin;
