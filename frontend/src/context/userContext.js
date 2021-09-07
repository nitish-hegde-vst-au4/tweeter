import React, { useContext, createContext } from 'react'

let UserContext = createContext()
let UserDispatchContext = createContext()

function useUserState() {
  const state = useContext(UserContext)
  if (typeof state === 'undefined') throw Error(`useUserState is used outside of it's provider`)
  return state
}

function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext)
  if (typeof dispatch === 'undefined') throw Error(`useUserDispatch is used outside of it's provider`)
  return dispatch
}

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState('')

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export { useUserState, useUserDispatch, UserProvider }
