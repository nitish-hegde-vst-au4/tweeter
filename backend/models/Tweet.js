const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  tweet: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Tweet = mongoose.model('tweet', TweetSchema)
