import { Flex } from '@chakra-ui/layout'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Posts from './components/Posts'

function App() {
  return (
    <>
      <BrowserRouter>
        <Flex w="100%" h="100%" flexDirection="column">
          <Header />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/login" />
            <Route path="/signup" />
          </Switch>
        </Flex>
      </BrowserRouter>
    </>
  )
}

export default App
