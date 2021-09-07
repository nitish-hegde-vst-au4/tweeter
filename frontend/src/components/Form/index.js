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
} from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
function Form({ type }) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: Boolean(type) })
  if (!isOpen) return <Redirect to="/" />
  return (
    <>
      {console.log({ type })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{type} Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form">
            <VStack spacing="5" align="right">
              <Box>
                <label htmlFor="username">Username</label>
                <Input type="text" id="#username" />
              </Box>
              <Box>
                <label htmlFor="password">Password</label>
                <Input type="password" id="#password" />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">{type}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Form
