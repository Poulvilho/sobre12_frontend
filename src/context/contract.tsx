import React, {createContext, useContext, useMemo, useState} from 'react';

export interface IContract {
  id: string,
  name: string,
}

export interface IContractContext {
  contract: IContract;
  setContract: React.Dispatch<React.SetStateAction<IContract>>;
}

const ContractContext = createContext<IContractContext>({
  contract: {id: '', name: ''},
  setContract: () => {},
});

interface IContractProvider {
  children: React.ReactNode;
}

const ContractProvider = ({children}: IContractProvider) => {
  const [contract, setContract] = useState<IContract>({id: '', name: ''});
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
