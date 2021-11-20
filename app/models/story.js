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
      type: String,
      required: true
    },
    encounter: {
      type: String,
      required: true
    },

    // Created a one-to-many relationship where one restaurant can have many reviews
    // using a sub document array
    comment: [commentSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Story', storySchema)
