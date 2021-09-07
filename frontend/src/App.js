import { Flex } from '@chakra-ui/layout'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Posts from './components/Posts'
import Form from './components/Form'

function App() {
  return (
    <>
      <BrowserRouter>
        <Flex w="100%" h="100%" flexDirection="column">
          <Header />
          <Posts />
          <Switch>
            {/* <Route path="/" component={Posts} /> */}
            <Route path="/login" render={(props) => <Form {...props} type="Login" />} />
            <Route path="/signup" render={(props) => <Form {...props} type="Signup" />} />
          </Switch>
        </Flex>
      </BrowserRouter>
    </>
  )
}

export default App
