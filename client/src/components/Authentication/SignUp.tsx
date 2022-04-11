import React, { useState } from "react";
import { Button, Container, Divider, Grid, Header, Input } from "semantic-ui-react";
import { AuthNavbar, GoogleSignUp } from ".";
import "../../styles/AuthenticationStyles/Authentication.scss";
import { Footer } from "../Landing";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../../redux/actions";
const randomImageUrl =
  "https://imgs.search.brave.com/igVz_-rj7gZEEdiFVt9_P4BxiMsvUMNHERLLYRi_P8A/rs:fit:320:320:1/g:ce/aHR0cHM6Ly9pY29u/LWxpYnJhcnkuY29t/L2ltYWdlcy9uby11/c2VyLWltYWdlLWlj/b24vbm8tdXNlci1p/bWFnZS1pY29uLTMu/anBn";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user,setUser]=useState({
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    password:"",
    confirmPassword:""
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
    if(user.firstName===""||user.lastName===""||user.userName===""||user.email===""||user.password===""||user.confirmPassword===""){
      toast.error("Please fill the details !")
    }
    if(user.password!==user.confirmPassword){
      toast.error("Passwords doesn't match")
    }
    let day=new Date().getDay()
    let newUser={
      firstName:user.firstName,
      lastName:user.lastName,
      userName:user.userName,
      email:user.email,
      password:user.password,
      profilePicUrl:randomImageUrl,
      famies:0,
      famFriends:[],
      famRequestsReceived:[],
      famRequestsSent:[],
      firstSignUp:false,
      famiesDay:day,
      famTags:[]
    }
    dispatch(userSignUp(newUser,navigate))
  }
  return (
    <div>
      <AuthNavbar />

      <div className="authenticationBackground">
        <Container>
          <Grid verticalAlign="middle" className="signUpContainer">
            <Grid.Row centered>
              <Grid.Column
                mobile={16}
                computer={12}
                tablet={16}
                largeScreen={10}
                textAlign="center"
              >
                <div className="signupFormContainer">
                  <Header
                    textAlign="center"
                    as="h1"
                    className="signUpFormHeader"
                  >
                    SignUp
                  </Header>
                  <form className="signUpForm" onSubmit={onFormSubmit}>
                    <div className="inputBox">
                      <Input
                        type="text"
                        fluid
                        icon="user"
                        iconPosition="left"
                        name="firstName"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputBox">
                      <Input
                        type="text"
                        fluid
                        icon="user"
                        iconPosition="left"
                        name="lastName"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputBox">
                      <Input
                        type="text"
                        fluid
                        icon="user"
                        iconPosition="left"
                        name="userName"
                        placeholder="Username"
                        value={user.userName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputBox">
                      <Input
                        type="email"
                        fluid
                        icon="at"
                        iconPosition="left"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputBox">
                      <Input
                        type="password"
                        fluid
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputBox">
                      <Input
                        type="password"
                        fluid
                        icon="lock"
                        iconPosition="left"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="inputBox">
                    <Button className="singUpButton">SignUp</Button>
                  </div>
                  </form>
                  <Divider className="orText" horizontal>or</Divider>
                  
                  <div className="inputBox googleBox">
                    <GoogleSignUp />
                  </div>
                  <p className="signUpRedirect">
                    Already a user?{" "}
                    <a className="signUpRedirectText" href="/signIn">
                      SignIn
                    </a>
                  </p>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default SignUp;
