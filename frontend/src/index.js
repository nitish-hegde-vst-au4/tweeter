import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
const App = lazy(() => import('./App'))

let root = (
  <ChakraProvider>
    <Suspense fallback={<h1>Loading...</h1>}>
      <App />
    </Suspense>
  </ChakraProvider>
)
var mountNode = document.getElementById('app')

ReactDOM.render(root, mountNode)
