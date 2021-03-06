const mongoose = require('mongoose')
// extract the Schema like they do in the docs
const Schema = mongoose.Schema

// Import the review schema, so we can create a subdocument relationship
const commentSchema = require('./comment')

const storySchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    message: {
      type: String
    },

    // Created a one-to-many relationship
    // using a sub document array
    comment: [commentSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Story', storySchema)
