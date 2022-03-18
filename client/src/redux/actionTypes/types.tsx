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

export type getProfileType = {
  userId: string;
};
export type userDataType = {
  userData: {
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
    _id: string;
  };
};

export type leftSidebarType = {
  visible: boolean;
  userData: {
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
    _id: string;
  };
};
export type rightSidebarType = {
  userData: {
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
    _id: string;
  };
  rightVisible: boolean;
};

export type teamChannelListType = {
  children: React.ReactNode;
  error: boolean;
  loading: any;
  type: any;
};

export type privateMessageType = {
  sender: boolean | undefined;
  message: {
    conversationId: string;
    createdAt:any;
    sender: string;
    text:any;
    updatedAt:any;
    __v: number;
    _id: string;
  };
};

export type famFriendsType = {
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
  _id: string;
};
