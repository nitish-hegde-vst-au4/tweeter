import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box, Container, Flex, Spacer } from '@chakra-ui/react'

function Header() {
  return (
    <Box as="header" bg="blue.500">
      <Flex as="nav" w={['80%']} maxW="960px" mx="auto" alignItems="center">
        <Box as="span" className="logo-container">
          <Link to="/">Tweeter</Link>
        </Box>
        <Spacer />
        <Box className="links">
          <Button
            as={Link}
            to="/login"
            bg="transparent"
            py="2"
            m="1"
            color="whiteAlpha.900"
            _active={{
              color: 'blue.500',
            }}
            _hover={{
              color: 'blue.500',
              bg: 'whiteAlpha.900',
            }}
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/signup"
            bg="transparent"
            py="2"
            m="1"
            color="whiteAlpha.900"
            _active={{
              color: 'blue.500',
            }}
            _hover={{
              color: 'blue.500',
              bg: 'whiteAlpha.900',
            }}
          >
            Signup
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default Header
