const mongoose = require('mongoose')
// construct the Schema into a variable  (like the docs do)
const Schema = mongoose.Schema
const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = commentSchema
