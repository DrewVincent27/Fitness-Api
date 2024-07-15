const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

	
        
            userId: {
                type: String,
                required: [true, 'Product name is required']
            },
            name: {
                type: String,
                required: [true, 'Workout name is required']
            },
            duration: {
                type: String,
                required: [true, 'Duration of workout is required']
            },
            status: {
                type: String,
                default: 'pending'
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }

        
    

    
})

module.exports = mongoose.model('Workout', workoutSchema);