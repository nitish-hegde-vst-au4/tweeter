import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  VStack,
  Box,
  useToast,
} from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import { useUserDispatch } from '../../context/userContext'
import { login } from '../../api'

function Form({ type }) {
  const [state, setFormData] = React.useState({
    username: '',
    password: '',
  })
  const toast = useToast()
  const dispatch = useUserDispatch()
  const handleToast = (type, message) => {
    return toast({
      description: message,
      status: type,
      duration: 9000,
      isClosable: true,
    })
  }

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: Boolean(type) })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = state
    if (!username || password.length < 6)
      return handleToast('warning', !username ? 'Username required' : 'password should contain atleast 6 characters')
    else {
      type === 'Login' &&
        login({ username, password })
          .then((res) => {
            dispatch(res.data)
            onClose()
          })
          .catch((err) => {
            handleToast('error', err?.toString())
          })
    }
  }
  if (!isOpen) return <Redirect to="/" />
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{type} Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="5" align="right">
              <Box>
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  id="#username"
                  value={state.username}
                  onChange={({ target: { value } }) => setFormData((prev) => ({ ...prev, username: value }))}
                />
              </Box>
              <Box>
                <label htmlFor="password">Password</label>
                <Input type="password" id="#password" onChange={({ target: { value } }) => setFormData((prev) => ({ ...prev, password: value }))} />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" type="submit" onClick={handleSubmit}>
              {type}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Form
