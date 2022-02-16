
export interface login {
    email: string;
    password: string;
}

export interface loginResponse extends login {
    id: string;
}