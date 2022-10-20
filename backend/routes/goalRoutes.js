const express = require('express')
const router = express.Router()
const { 
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
 } = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, setGoal)

router.route('/:id').get(getGoals).delete(deleteGoal).put( updateGoal)



module.exports = router