const express = require('express')
const router = express.Router()
const { 
  getBugs,
  setBug,
  updateBug,
  deleteBug,
 } = require('../controllers/bugController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getBugs).post(protect, setBug)

router.route('/:id').delete(protect, deleteBug).put(protect, updateBug)



module.exports = router