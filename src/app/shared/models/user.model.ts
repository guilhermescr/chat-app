export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  databaseKey?: string;
  id: string;
  username: string;
  password: string;
  usernameHeadingColor?: string;
  friends: {
    friendsList: User[];
    sentRequests: string[];
    receivedRequests: string[];
  };
  messages?: string[];
}
