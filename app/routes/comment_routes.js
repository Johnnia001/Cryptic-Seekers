const express = require('express')

const router = express.Router()

// To create a subdocument, we need the parent document's model
// So import the Story model
const Story = require('../models/story')

const handle404 = require('../../lib/custom_errors')

// This route is used to create a comment for a story
router.post('/comments', (req, res, next) => {
  // extract our comment's data from the request's body
  const commentData = req.body.comment
  // extract the storyId for the story we want to comment
  const storyId = commentData.storyId

  // These next 3 lines, are the same as showing a story
  Story.findById(storyId)
    .then(handle404)
    .then((story) => {
      // add a new comment for the story to the comments subdocument array
      story.comments.push(commentData)

      // to save a subdocument, you must save its parent document (the story)
      return story.save()
    })
  // respond with the status code 201 Created and the story with a new comment on it
    .then((story) => res.status(201).json({ story }))
  // if an error occurs, call the error middleware
    .catch(next)
})

router.delete('/comments/:commentId', (req, res, next) => {
  // Extract the story id, just like we did when we created a comment
  const commentData = req.body.comment
  const storyId = commentData.storyId

  // Extract the comment id
  const commentId = req.params.commentId

  // These next 3 lines, are the same as showing a story
  Story.findById(storyId)
    .then(handle404)
    .then((story) => {
      // select the comment from the comments subdocument array using the comment's id (story.comments.id(commentId))
      // then remove that comment
      // story.comments.id(commentId).remove()

      // Alternative way to delete
      story.comments.pull(commentId)
      // Note: pull can delete many documents at the same time (but is not commonly used)
      // story.comments.pull(commentId, commentId2, commentId3)

      // to make sure the comment is deleted, save its parent document (story)
      return story.save()
    })
  // respond with a successful 204 No Content
    .then(() => res.sendStatus(204))
    .catch(next)
})

// A request to update a single comment.
router.patch('/comments/:commentId', (req, res, next) => {
  // extract the comment data from the request's body (like we did in create)
  const commentData = req.body.comment
  // we need to accept the comment and story id (like we did in destroy)
  const storyId = commentData.storyId

  // Extract the comment id from the route parameters
  const commentId = req.params.commentId

  // These next 3 lines, are the same as showing a story
  Story.findById(storyId)
    .then(handle404)
    .then((story) => {
      // get the comment subdocument from the comments array by its id
      const comment = story.comments.id(commentId)

      // update our comment subdocument, with the data from our comment
      // (similar to updateOne for normal documents, but we need to `save` afterwards)
      comment.set(commentData)

      // to ensure the comment subdocument is updated, save its parent document (story)
      return story.save()
    })
  // Respond with a successful 204 No Content message
    .then(() => res.sendStatus(204))
    .catch(next)
})

// export the router, so we can register it in server.js
module.exports = router
