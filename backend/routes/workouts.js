const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middlewares/requiereAuth')

//require auth for all workout routes
router.use(requireAuth)

//GET all of the workouts
router.get('/',getWorkouts);
//GET a single workout
router.get('/:id',getWorkout);
//POST a new workout
router.post('/',createWorkout);
//DELETE a workout
router.delete('/:id',deleteWorkout);
//UPDATE a workout
router.patch('/:id',updateWorkout);


module.exports = router;
