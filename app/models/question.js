const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    default: ''
  },
  answers: [{
    type: String,
    default: ''
  }]
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
}, {
  timestamps: true
})

// module.exports = mongoose.model('Survey', surveySchema)
module.exports = questionSchema
