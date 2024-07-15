const Workout = require('../models/Workout');
// const User = require('../models/User');


module.exports.addWorkout = (req, res) => {
    
    const {name, duration} = req.body

    // return Workout.findOne({ userId: req.user.id }).then(exercise => { 


            let newWorkout = new Workout({
                userId: req.user.id,
                name: name,
                duration: duration
            });

            // let listOfWorkout = newWorkout.workouts
        
        
                return newWorkout.save().then(user => res.status(201).send(newWorkout)).catch(saveErr => {
                    
                    console.error('Error in saving the user: ', saveErr);
                    res.status(500).send({ error : 'Error in Save' });
            })

        // if(exercise) {

        //     exercise.workouts.push({name:name, duration:duration});

        //     exercise.save().then(updatedWorkouts => {
        //         console.log()

        //         return res.status(200).send({message:'New item is successfully added to cart', updatedWorkouts})

        //     }).catch(saveErr => {
    
        //         console.error('Error in saving the cart ', saveErr);

        //         return res.status(500).send({ error: 'Error in saving the cart' });
        //     })

        // }
    // })


};



module.exports.getMyWorkouts = (req, res) => { 

    
    // console.log('here is the user Id', req.user.id);
    return Workout.find({ userId:req.user.id }).then(workouts => {
        if (!workouts) {

            return res.status(404).send({ error: 'User not found' });
        }

            return res.status(200).send({ workouts });
          
            

    }).catch(findErr => {
        
        console.error('Error in finding user : ', findErr);

        return res.status(500).send({ error: 'Failed to fetch user profile' })});

};


module.exports.updatedWorkouts = async(req, res) => {

    const { name, duration } = req.body;
    const {workoutId} = req.params;


    try {
        const exercise = await Workout.findById(workoutId);

        if (!exercise) {
            return res.status(404).send({ message: 'Exercise not found' });
        }

        exercise.name = name;
        exercise.duration = duration;

        const updatedWorkout = await exercise.save();
        return res.status(200).send({
            message: 'Workout updated successfully',
            updatedWorkout
        });
    } catch (err) {
        return res.status(500).send({ error: 'Error updating the exercise', details: err.message });
    }

};


module.exports.deleteWorkout = async (req, res) => { 

    const {workoutId} = req.params;

    try {

        const exercise = await Workout.findByIdAndDelete(workoutId);

        if (!exercise) {
            return res.status(404).send({ message: 'Exercise not found' });
        }

        return res.status(200).send({
            message: 'Workout deleted successfully'
        });


    } catch (err) {
        return res.status(500).send({ error: 'Error deleting the exercise', details: err.message });
    }
}


module.exports.updateStatus = async(req, res) => {

    const {workoutId} = req.params;

    try {

        const exercise = await Workout.findById(workoutId);

        if(!exercise){
            return res.status(404).send({ message: 'Exercise not found' });
        }

        exercise.status = "completed"

        await exercise.save();

        return res.status(200).send({
            message: "Workout status updated successfully",
            updatedWorkout: exercise
        })


    } catch (err) {
        return res.status(500).send({ error: 'Error updating the exercise', details: err.message });
    }
}

