
export interface user {
  email: string;
  password: string;
};

export interface loginResponse extends user {
  id: string;
}