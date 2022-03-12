import Reac,{useState} from "react";
import { Button, Container, Grid,Header,Input } from "semantic-ui-react";
import { AuthNavbar, GoogleSignIn } from ".";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthenticationStyles/Authentication.scss";
import { Footer } from "../Landing";
import { userSignIn } from "../../redux/actions";
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user,setUser]=useState({
    email:"",
    password:"",
  })
  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.persist()
    setUser((inp)=>({
      ...inp,
      [e.target.name]:e.target.value
    }))
}
const onFormSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  if(user.email===""||user.password===""){
    toast.error("Please fill the details !")
  }

  let newUser={
    email:user.email,
    password:user.password,
  
 
  }
  dispatch(userSignIn(newUser,navigate))
}
  return (

    <div>
      <AuthNavbar/>
      <div className="authenticationBackground">
        <Container>
        <Grid verticalAlign="middle" className="signUpContainer">
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={12} tablet={16} largeScreen={8} textAlign="center">
            <div className="signupFormContainer">
              <Header textAlign="center" as='h1'className="signUpFormHeader">SignIn</Header>
              <form className="signUpForm" onSubmit={onFormSubmit}>
                
                <div className="inputBox">
                <Input value={user.email} onChange={handleInputChange} type="email" fluid icon='at' iconPosition='left' name="email" placeholder='Email' />
                </div>
                <div className="inputBox">
                <Input value={user.password} onChange={handleInputChange} type="password" fluid icon='lock' iconPosition='left' name="password" placeholder='Password' />
                </div>
               
                <div className="inputBox">
               <Button  className="singUpButton">SignIn</Button>
                </div>
              </form>
             
                <p className="orText">or</p>
                <div className="inputBox googleBox">
                  <GoogleSignIn/>
                </div>
                <p className="signUpRedirect">New to FamJam ? <a className="signUpRedirectText" href="/signUp">SignUp</a></p>
            </div>
          </Grid.Column>
        </Grid.Row>
        </Grid>
        </Container>
        
      </div>
      <Footer/>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default SignIn;
