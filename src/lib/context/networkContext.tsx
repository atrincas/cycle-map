'use client'
import { Network } from '@/types'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface iNetworkContext {
  allNetworks: Network[]
  networks: Network[]
  setNetworks: Dispatch<SetStateAction<Network[]>>
}

export const NetworkContext = createContext<iNetworkContext>({} as iNetworkContext)

interface NetworkProviderProps {
  intitialValue: Network[]
  children: ReactNode
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ intitialValue, children }) => {
  const [networks, setNetworks] = useState<Network[]>(intitialValue)

  return (
    <NetworkContext.Provider
      value={{
        allNetworks: intitialValue,
        networks,
        setNetworks
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}
