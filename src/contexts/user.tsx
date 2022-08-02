import React, {createContext, useContext, useMemo, useState} from 'react';

export interface IUser {
  id: string,
  name: string,
  email: string,
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

interface IUserProvider {
  children: React.ReactNode;
}

const UserProvider = ({children}: IUserProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
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
