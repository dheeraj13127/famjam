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
  famiesDay:number;
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
export type OwnUserDataType = {
 
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
  message:any
  setMessage:any
  conversations:any,
  setActivateMessage:any
  closeLeftSidebar:()=>void
  onlineUsers:any
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
    famiesDay:number,
    famTags:any
  };
  rightVisible: boolean;
  closeRightSidebar:()=>void
};

export type chatComponentType={
  message:any,
  setMessage:any,
  activateMessage:boolean,
  setActivateMessage:any
  setOnlineUsers:any,
  onlineUsers:any


}

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
  scrollRef:any
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
 export type createMessageType={
  conversationId:string,
  sender:string,
  text:string
 }
 export type ServerToClientEvents= {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export type ClientToServerEvents ={
  hello: () => void;
}
export type arrivalMessageType={
  senderId:string
  text:string
}
export type friendIdType={
  friendId:string
}

export type rewardsSectionDataType={
        id:number
        title:string
        icon:string
        color:string
        price:number
}
