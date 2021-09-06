import React, { useState } from 'react'
import { Flex, Box, Spacer, Button, Textarea } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'

function CreatePosts() {
  const [count, setCount] = useState(140)
  const [tweet, setTweet] = useState('')

  const handleTweet = ({ target: { value } }) => {
    console.log(value.length)
    if (value?.length <= 140) {
      setTweet(value)
      setCount(140 - value.length)
    } else if (value.length) {
      setTweet(value.slice(0, 140))
      setCount(0)
    }
  }
  return (
    <VStack align="flex-end">
      <Textarea variant="outline" placeholder="Outline" value={tweet} onChange={handleTweet} />
      <Box ml="auto">
        <Box as="span">{count} characters left</Box>
        <Button ml="2">Create Post</Button>
      </Box>
    </VStack>
  )
}

export default function Posts() {
  return (
    <>
      <Flex as="section" w={['80%']} flex="1" py="5" flexDirection="column" maxW="960px" mx="auto">
        <CreatePosts />
        <Flex bg="whiteAlpha.900" borderWidth="1px" borderRadius="lg" as="article" p="5" my="5" flexDirection="column">
          <Flex>
            <Box as="span">Username</Box>
            <Spacer />
            <Button>Follow</Button>
          </Flex>
          <Box as="hr" mt="2" />
          <Box as="p" py="2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur perspiciatis rem ab quos, aliquam expedita magni temporibus
            blanditiis porro dolorem fuga ipsa! Natus ut rerum porro esse distinctio inventore dolore?
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
