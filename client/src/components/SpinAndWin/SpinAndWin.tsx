import React from 'react'
import { useSelector } from 'react-redux';
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import { famReducerState } from '../../redux/reducers';
import '../../styles/SpinAndWinStyles/SpinAndWin.scss'

function SpinAndWin() {
    let userData = useSelector<famReducerState, famReducerState["userData"]>(
        (state) => state.userData
      );
  
  return (
    <div>
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
                <div className="spinAndWinSpinnerBox">
                

                     
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
  )
}

export default SpinAndWin