// require the express library
const express = require('express')

// require the passport library for authentication
const passport = require('passport')

// require the story model (so we can interact with the mongodb database)
const Story = require('../models/story')

// require our custom errors
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
// this function, when added to a route, will ensure that the user is signed in before accessing
// that route. Otherwise an error will occur.
const requireToken = passport.authenticate('bearer', { session: false })

// Create a router for our user routes
const router = express.Router()

// A route to create an story.
// requireToken makes sure only a signed in user can create an story
router.post('/stories', requireToken, (req, res, next) => {
  // extract the story data from our client's request
  const storyData = req.body

  // Whenever an story is created, set the owner of the story (storyData.owner)
  // to be the currently signed in user (req.user._id)
  storyData.owner = req.user.id
  // Create an story using the storyData
  Story.create(storyData)
  // respond with a 201 created and the story
    .then((story) => res.status(201).json({ story }))
    .catch(next)
})

// INDEX
// GET /stories
router.get('/stories', requireToken, (req, res, next) => {
  Story.find()
    .then(stories => {
      // `stories` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return stories.map(movie => movie.toObject())
    })
    // respond with status 200 and JSON of the stories
    .then(stories => res.status(200).json({ stories: stories }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// A route to destroy an story
router.delete('/stories/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Story.findById(id)
    .then(handle404)
  // Before deleting an story, make sure that the current user owns it
  // otherwise cause an ownership error
    .then((story) => requireOwnership(req, story))
    .then((story) => story.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Update: PATCH /stories/:id
router.patch('/stories/:id', requireToken, removeBlanks, (req, res, next) => {
  // get id of story from params
  const id = req.params.id
  // get story data from request
  const storyData = req.body.story
  // fetching story by its id
  Story.findById(id)
  // handle 404 error if no story found
    .then(handle404)
  // ensure the signed in user (req.user.id) is the same as the story's owner (story.owner)
    .then((story) => requireOwnership(req, story))
  // updating story object with storyData
    .then((story) => story.updateOne(storyData))
  // if successful return 204
    .then(() => res.sendStatus(204))
  // on error go to next middleware
    .catch(next)
})

module.exports = router
