const mongoose = require('mongoose')

const FollowerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  followerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
})

module.exports = Follower = mongoose.model('follower', FollowerSchema)
