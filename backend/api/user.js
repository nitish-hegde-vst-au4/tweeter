const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const UserToFollow = require('../models/UserToFollow')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../config/middlewares/auth')

router.post(
  '/',
  [
    check('username', 'Username should not be empty').not().isEmpty(),
    check('password', 'Password should contain atleast six characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    errors.array().forEach((i) => {
      delete i.value
    })
    if (!errors.isEmpty()) {
      return res.status('400').json({ errors: errors.array() })
    }

    const { username, password } = req.body

    try {
      let user = await User.findOne({ username })
      if (user) {
        return res.json({ errors: [{ msg: 'User already exists!' }] })
      }
      user = new User({
        username,
        password,
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (error) {
      console.error({ error })
      res.status(500).send('server error')
    }
  }
)

router.put('/follow/:userIdToFollow', auth, async (req, res) => {
  try {
    if (req.user.id == req.params.userIdToFollow) {
      return res.status(500).send({ message: "Error! Can't follow oneself!" })
    } else {
      let result = await UserToFollow.findOneAndUpdate({ userId: req.user.id }, { $addToSet: { userToFollowIds: req.params.userIdToFollow } })
      if (result) {
        return res.json({ result })
      } else {
        result = new UserToFollow({
          userId: req.user.id,
          userToFollowIds: [req.params.userIdToFollow],
        })
        await result.save()
        return res.json({ result })
      }
    }
  } catch (error) {
    console.error({ error })
    res.status(500).send(error)
  }
})

router.put('/unfollow/:userIdToUnfollow', auth, async (req, res) => {
  try {
    if (req.user.id == req.params.userIdToUnfollow) {
      return res.status(500).send({ message: "Error! Can't unfollow oneself!" })
    } else {
      let result = await UserToFollow.findOneAndUpdate({ userId: req.user.id }, { $pull: { userToFollowIds: req.params.userIdToUnfollow } })
      return res.json({ result })
    }
  } catch (error) {
    console.error({ error })
    res.status(500).send(error)
  }
})

module.exports = router
