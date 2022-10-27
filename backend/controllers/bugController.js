const asyncHandler = require('express-async-handler')

const Bug = require('../models/bugModel')

const User = require('../models/userModel')


// @desc Get bugs
// @route GET /api/bugs
// @access Private 

const getBugs = asyncHandler(async (req, res) => {
  const bugs = await Bug.find({})

  res.status(200).json(bugs)

})

// @desc Set bug
// @route POST /api/bugs
// @access Private 

const setBug = asyncHandler(async (req, res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }
  
  const bug = await Bug.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(bug)
})

// @desc Update bug
// @route PUT /api/bugs/:id
// @access Private 

const updateBug = asyncHandler(async (req, res) => {
  
  const bug = await Bug.findById(req.params.id)
  
  if(!bug){
    res.status(400)
    throw new Error('Bug not found')
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body,
    {
      new: true,
  })


  res.status(200).json(updatedBug)
})

// @desc Delete bug
// @route DELETE /api/bugs
// @access Private 

const deleteBug = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id)

  if (!bug) {
    res.status(400)
    throw new Error('Bug not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  await bug.remove()

  res.status(200).json({ id: req.params.id })

})

module.exports = {
  getBugs, 
  setBug,
  updateBug,
  deleteBug,

}