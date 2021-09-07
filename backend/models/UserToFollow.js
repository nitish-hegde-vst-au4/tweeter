const mongoose = require('mongoose')

const UserToFollowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  userToFollowIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
})

module.exports = UserToFollow = mongoose.model('usersToFollow', UserToFollowSchema)
