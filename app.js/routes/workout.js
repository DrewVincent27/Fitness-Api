const express = require('express');

const workoutController = require('../controllers/workout');


const {verify} = require('../../auth');

const router = express.Router();




//add workouts
router.post('/add-workout', verify, workoutController.addWorkout);


// route to get list of workouts inside users cart
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);

//update workout
router.patch('/updateWorkout/:workoutId', verify, workoutController.updatedWorkouts);

//delete workout
router.delete('/deleteWorkout/:workoutId', verify, workoutController.deleteWorkout);

//update status workoout
router.patch('/completeWorkoutStatus/:workoutId', verify, workoutController.updateStatus);
module.exports = router;