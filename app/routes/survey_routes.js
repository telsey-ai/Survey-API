// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const User = require('../models/user')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/survey', requireToken, (req, res, next) => {
  console.log(req)
  User.findById(req.user.id)
    .then(user => {
      // return status 201, the email, and the new token
      res.status(201).json({ user: user.toObject() })
    })
    // .then(user => {
    //   // `examples` will be an array of Mongoose documents
    //   // we want to convert each one to a POJO, so we use `.map` to
    //   // apply `.toObject` to each one
    //   return user.surveys.map(disc => disc.toObject())
    // })
    // // respond with status 200 and JSON of the examples
    // .then(surveys => res.status(200).json({ surveys: surveys }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
// router.get('/examples/:id', requireToken, (req, res, next) => {
//   // req.params.id will be set based on the `:id` in the route
//   Example.findById(req.params.id)
//     .then(handle404)
//     // if `findById` is succesful, respond with 200 and "example" JSON
//     .then(example => res.status(200).json({ example: example.toObject() }))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

// CREATE
// POST /examples
router.post('/survey', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  // req.body.disc.owner = req.user.id
  // const disc = req.body.disc
  // console.log(disc)

  User.findById(req.user.id)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(user => {
      console.log(user)
      const survey = req.body.survey
      user.surveys.push(survey)
      return user.save()
    })
    .then(user => {
      res.status(201).json({ user: user.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/survey/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  // delete req.body.disc.owner
  console.log(req.body)
  // console.log(req.params.id)
  const survey = req.body.survey
  let surveyIndex
  User.findById(req.user.id)
    .then(handle404)
    .then(user => {
      console.log(user)
      // console.log('REQ.BODY.DISC.ID', req.body.disc._id)
      user.surveys.forEach(disc => console.log(disc._id))
      surveyIndex = user.surveys.findIndex(survey => survey._id == req.params.id)
      console.log(surveyIndex)
      // console.log('survey at index', user.bag[surveyIndex])
      user.surveys[surveyIndex] = survey
      // user.bag[discIndex].deleteOne()
      console.log(user)
      return user.save()
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/survey/:id', requireToken, (req, res, next) => {
  // console.log('Disc: ', Disc)
  // console.log('User: ', User)
  // console.log('req params', req.params)
  // console.log('req.params.id', req.params.id)

  // req.body.disc.owner = req.user.id
  // const discDel = req.body.disc
  let surveyIndex
  // Disc.estimatedDocumentCount()
  //   .then(console.log)
  // User.estimatedDocumentCount()
  //   .then(console.log)
  // User.findById(req.params.id)
  //   .then(user => {
  //     console.log(user)
  //     user.bag.update({ _id: req.body.disc._id }, { "$pull": { "d"}})
  //   })
  // Dive.update({ _id: diveId }, { "$pull": { "divers": { "user": userIdToRemove } }}, { safe: true, multi:true }, function(err, obj) {
  //   //do something smart
  // });
  User.findById(req.user.id)
    .then(handle404)
    .then(user => {
      user.surveys.id(req.params.id).remove()
      // console.log(user)
      // console.log('REQ.BODY.DISC.ID', req.body.disc._id)
      // user.survey.forEach(disc => console.log(disc._id))
      // surveyIndex = user.surveys.findIndex(survey => survey._id == req.body.disc._id)
      // console.log(surveyIndex)
      // console.log('disc at index', user.bag[discIndex])
      // // user.bag[discIndex].deleteOne()
      // user.bag.splice(discIndex, 1)
      // console.log(user)
      user.save()
    })
    // .then(disc => {
    //   // throw an error if current user doesn't own `example`
    //   requireOwnership(req, disc)
    //   // delete the example ONLY IF the above didn't throw
    //   disc.deleteOne()
    // })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
