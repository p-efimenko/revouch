'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type ModalsStore,
  createModalsStore,
  initModalsStore,
} from './modals-store'

export type ModalsStoreApi = ReturnType<typeof createModalsStore>

export const ModalsStoreContext = createContext<ModalsStoreApi | undefined>(
  undefined,
)

export interface ModalsStoreProviderProps {
  children: ReactNode
}

export const ModalsStoreProvider = ({ children }: ModalsStoreProviderProps) => {

  const storeRef = useRef<ModalsStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createModalsStore(initModalsStore())
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <ModalsStoreContext.Provider value={storeRef.current}>
      {children}
    </ModalsStoreContext.Provider>
  )
}


// eslint-disable-next-line @stylistic/comma-dangle
export const useModalsStore = <T,>(
  selector: (store: ModalsStore) => T,
): T => {
  const modalsStoreContext = useContext(ModalsStoreContext)

  if (!modalsStoreContext) {
    throw new Error('useModalsStore must be used within ModalsStoreProvider')
  }

  return useStore(modalsStoreContext, selector)
}