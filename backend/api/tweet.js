const router = require('express').Router()
const Tweet = require('../models/Tweet')
const Followers = require('../models/Follower')
const auth = require('../config/middlewares/auth')

// route: get /api/tweets
// desc: GET all tweets
// access: public
router.get('/', async (req, res) => {
  try {
    let tweet = await Followers.find().sort({ date: -1 })
    res.json(tweet)
  } catch (error) {
    console.log('error', error.message)
    res.status(500).send('server error')
  }
})

// route: get /api/tweets/timeline
// desc: GET all timeline tweets (user's tweets and the ones he follows)
// access: private
// router.get('/timeline', auth, async (req, res) => {
//   try {
//     // let followedByUsers = Followers.find({ followerId:req.user.id }).select('followerId')
//     let tweet = await Tweet.find().sort({ date: -1 })
//     res.json(tweet)
//   } catch (error) {
//     console.log('error', error.message)
//     res.status(500).send('server error')
//   }
// })

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
