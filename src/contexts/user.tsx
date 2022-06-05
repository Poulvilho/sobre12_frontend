import React, {createContext, useContext, useMemo, useState} from 'react';

export interface IUser {
  id: string,
  name: string,
  email: string,
}

export interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const UserContext = createContext<IUserContext>({
  user: {id: '', name: '', email: ''},
  setUser: () => {},
});

interface IUserProvider {
  children: React.ReactNode;
}

const UserProvider = ({children}: IUserProvider) => {
  const [user, setUser] = useState<IUser>({id: '', name: '', email: ''});
  const providerValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export function useUser() {
  return useContext(UserContext);
}
