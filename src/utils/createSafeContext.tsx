import { createContext, useContext } from 'react'

export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null)

  const useSafeContext = () => {
    const ctx = useContext(Context)

    if (ctx === null) {
      throw new Error(errorMessage)
    }

    return ctx
  }

  const Provider = <T extends ContextValue>({
    children,
    value,
  }: {
    value: T
    children: React.ReactNode
  }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  )

  return [Provider, useSafeContext] as const
}
