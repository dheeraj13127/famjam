export type googleSignUpType = {
  data: {
    message: string;
    token: string;
    user: {
      _id: string;
    };
  };
};
export type signUpType = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  profilePicUrl: string;
  famies: number;
  famFriends: string[];
  famRequestsReceived: string[];
  famRequestsSent: string[];
  firstSignUp: boolean;
};
export type signInType = {
  email: string;
  password: string;
};

export type getProfileType={
  userId:string
}
export type userDataType={
  userData:{
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    profilePicUrl: string;
    famies: number;
    famFriends: string[];
    famRequestsReceived: string[];
    famRequestsSent: string[];
    firstSignUp: boolean;
  }
  
}