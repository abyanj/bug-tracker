const mongoose = require('mongoose')

const bugSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',

    },
    text: {
      type: String,
      required: [true, 'Please add a a text value']
    },
  }, 
  {
      timestamps: true,
  }
)

module.exports = mongoose.model('bug', bugSchema)