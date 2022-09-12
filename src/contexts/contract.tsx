import React, {createContext, useContext, useMemo, useState} from 'react';

export interface IContract {
  id: string,
  name: string,
  description: string,
  dtstart: Date,
  dtend: Date,
  user: string,
  guest: string,
  role: number;
}

export interface IContractContext {
  contract: IContract | null;
  setContract: React.Dispatch<React.SetStateAction<IContract | null>>;
}

const ContractContext = createContext<IContractContext>({
  contract: null,
  setContract: () => {},
});

interface IContractProvider {
  children: React.ReactNode;
}

const ContractProvider = ({children}: IContractProvider) => {
  const [contract, setContract] = useState<IContract | null>(null);
  const providerValue = useMemo(
    () => ({
      contract,
      setContract,
    }),
    [contract],
  );

  return (
    <ContractContext.Provider value={providerValue}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;

export function useContract() {
  return useContext(ContractContext);
}
