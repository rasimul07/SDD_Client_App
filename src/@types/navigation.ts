export type AuthStackParamList = {
  GetStart: undefined;
  SignIn: undefined;
  SignUp: undefined;
  LostPassword: undefined;
  Verification: {userInfo: NewUserResponse};
};
// export interface UserStackParamList extends AuthStackParamList {
//     Home: undefined;
//     GetStart: undefined;
// }

interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}
export type UserStackParamList = {
  Home: undefined;
  Profile:undefined;
  Result:{index:number};
  Chat:undefined;
};
