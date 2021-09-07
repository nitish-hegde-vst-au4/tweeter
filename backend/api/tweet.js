const router = require('express').Router()
const Tweet = require('../models/Tweet')
const User = require('../models/User')
const UserToFollow = require('../models/UserToFollow')
const auth = require('../config/middlewares/auth')

// route: get /api/tweets
// desc: GET all tweets
// access: public
router.get('/', async (req, res) => {
  try {
    let tweets = await Tweet.find().sort({ date: -1 })
    tweets = tweets.map(async ({ _id, userId, createdDate, tweet }) => {
      let { username } = await User.findById({ _id: userId }).select('-password')
      return { _id, userId, createdDate, tweet, username }
    })
    const result = await Promise.all(tweets)
    return res.json(result)
  } catch (error) {
    console.log('error', error.message)
    res.status(500).send('server error')
  }
})

// route: get /api/tweets/timeline
// desc: GET all timeline tweets (user's tweets and the ones he follows)
// access: private
router.get('/timeline', auth, async (req, res) => {
  try {
    let userTweets = await Tweet.find({ userId: req.user.id })
    let { userToFollowIds: followedUsers } = await UserToFollow.findOne({ userId: req.user.id }).select('-userId')
    followedUsers = JSON.parse(JSON.stringify(followedUsers))
    if (followedUsers?.length) {
      let followedUsersTweets = followedUsers.reduce(async (tweets, followedUserId) => {
        let { _id, tweet, createdDate, userId } = await Tweet.findOne({ userId: followedUserId })
        tweets.push({ _id, tweet, createdDate, userId })
        return tweets
      }, [])
      followedUsersTweets = await new Promise((resolve, reject) => resolve(followedUsersTweets))

      return res.json({
        result: [...userTweets, ...followedUsersTweets].sort((a, b) => {
          if (a.createdDate < b.createdDate) return 1
          else return -1
        }),
      })
    } else {
      return res.json({ result: [] })
    }
  } catch (error) {
    console.log('error', error.message)
    res.status(500).send('server error')
  }
})

// route: post /api/tweets
// desc: Post a tweet
// access: private
router.post('/', auth, async (req, res) => {
  try {
    let { tweet } = req.body
    if (!tweet.trim()) {
      return res.send({ msg: 'Empty tweet!' })
    }
    tweet = new Tweet({
      tweet,
      userId: req.user.id,
    })
    await tweet.save()
    res.json(tweet)
  } catch (error) {
    console.log('error', error.message)
    res.status(500).send('server error')
  }
})

module.exports = router
