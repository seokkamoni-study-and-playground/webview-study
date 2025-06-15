import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextState {
  isOffline: boolean;
};

const NetworkContext = createContext<NetworkContextState | null>(null);

export const NetworkProvider = ({ children }: PropsWithChildren) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isOffline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextState => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
}
  return context;
};
