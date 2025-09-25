export interface IAuthState {
  isAuth: boolean;
  userData: UserData;
}

export type UserData = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
};

export type editedData = {
  username: string;
  firstname: string;
  lastname: string;
};
