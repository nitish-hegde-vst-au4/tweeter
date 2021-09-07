import { Flex } from '@chakra-ui/layout'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Posts from './components/Posts'
import Form from './components/Form'
import { useUserState, UserProvider } from './context/userContext'

function Routes() {
  const user = useUserState()
  return (
    <Switch>
      {/* <Route path="/" component={Posts} /> */}
      {user ? null : (
        <>
          <Route path="/login" render={(props) => <Form {...props} type="Login" />} />
          <Route path="/signup" render={(props) => <Form {...props} type="Signup" />} />
        </>
      )}
    </Switch>
  )
}

Routes = React.memo(Routes)

function App() {
  return (
    <>
      <BrowserRouter>
        <Flex w="100%" h="100%" flexDirection="column">
          <UserProvider>
            <Header />
            <Posts />
            <Routes />
          </UserProvider>
        </Flex>
      </BrowserRouter>
    </>
  )
}

export default App
