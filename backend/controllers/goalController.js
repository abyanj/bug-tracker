const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

const User = require('../models/userModel')


// @desc Get goals
// @route GET /api/goals
// @access Private 

const getGoals = asyncHandler(async (req, res) => {
  //if (req.params.id){
    const user = await User.findById(req.params.id) 
    if (user){
    const goals = await Goal.find()
    res.status(200).json(goals)
  }
  //}

})

// @desc Set goal
// @route POST /api/goals
// @access Private 

const setGoal = asyncHandler(async (req, res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }
  
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private 

const updateGoal = asyncHandler(async (req, res) => {
  
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new Error('Goal not found')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
    {
      new: true,
  })


  res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals
// @access Private 

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (goal){
    goal.remove()
    res.status(200).json({message: "Goal Deleted"})
  }
  else {
    res.status(400).json("Goal not found")
  }

})

module.exports = {
  getGoals, 
  setGoal,
  updateGoal,
  deleteGoal,

}