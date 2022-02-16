import { login } from "../Login/api";

export interface user extends login {
  name: string;
};
