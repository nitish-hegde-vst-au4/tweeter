import React, { useState } from 'react'
import { Flex, Box, Spacer, Button, Textarea } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/layout'
import { getTweets } from '../../api'
import { useUserState, useUserDispatch } from '../../context/userContext'

function CreatePosts() {
  const user = useUserState()

  if (!user) return null
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
      <Textarea variant="outline" placeholder="Create tweet... " value={tweet} onChange={handleTweet} />
      <Box ml="auto">
        <Box as="span">{count} characters left</Box>
        <Button ml="2">Create Post</Button>
      </Box>
    </VStack>
  )
}

export default function Posts() {
  const user = useUserState()
  const [tweetsData, setTweets] = React.useState([])
  React.useEffect(() => {
    getTweets().then((res) => {
      setTweets(res.data)
    })
  }, [])
  return (
    <>
      <Flex as="section" w={['80%']} flex="1" py="5" flexDirection="column" maxW="960px" mx="auto">
        <CreatePosts />
        {tweetsData.map(({ _id, tweet, username }) => (
          <Flex key={_id} bg="whiteAlpha.900" borderWidth="1px" borderRadius="lg" as="article" p="5" my="5" flexDirection="column">
            <Flex>
              <Box as="h2">{`@${username}`}</Box>
              <Spacer />
              {!user ? null : <Button>Follow</Button>}
            </Flex>
            <Box as="hr" mt="2" />
            <Box as="p" py="2">
              {tweet}
            </Box>
          </Flex>
        ))}
      </Flex>
    </>
  )
}
