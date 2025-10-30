import { createStore } from 'zustand/vanilla'

import type { ModalId } from '@/components/modals'
import type { ModalMap, ModalProps } from '../types'

export type ModalsState = {
  modals:  ModalMap
}

export type PayloadModal<Props = ModalProps> = {
  id: ModalId
  props?: Props
}

export type ModalsActions = {
  open: (payload: PayloadModal<ModalProps>) => void
  close: (id: ModalId) => void
  destroy: (id: ModalId) => void
}

export type ModalsStore = ModalsState & ModalsActions

export const initModalsStore = (): ModalsState => {
  return {
    modals: {},
  }
}

export const defaultInitState: ModalsState = {
  modals: {},
}

export const createModalsStore = (
  initState: ModalsState = defaultInitState,
) => {
  return createStore<ModalsStore>()((set) => ({
    ...initState,

    // Open Modal Action
    open: (payload) => set((state) => {
      return {
        modals: {
          ...state.modals,
          [payload.id]: {
            id: payload.id,
            props: payload.props ?? {},
            isOpen: true,
          },
        },
      }
    }),

    // Close Modal Action
    close: (id) => set((state) => {
      const modal = state.modals[id]

      if (!modal) {
        console.warn(`Modal with id "${id}" not found`)
        return state
      }

      return {
        modals: {
          ...state.modals,
          [id]: {
            id: modal.id,
            props: modal.props,
            isOpen: false,
          },
        },
      }
    }),

    // Destroy Modal Action
    destroy: (id) => set((state) => {
      const modals = state.modals
      delete modals[id]

      return { modals }
    }),
  }))
}