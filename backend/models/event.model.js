const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: [3, "Title should be more than 3 characters"]
    },
    type : {
        type: String,
        enum: ['Community Drives','Corporate Events','School Drives'],
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description should be more than 10 characters"]
    },
    date: {
        type: Date,
        required: true,
        min: [new Date(), "Event date cannot be in the past"]
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
        minLength: [5, "Address should be more than 5 characters"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        address: {
            type: String,
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    goal: {
        type: Number,
        required: true,
        min: [0, "Goal amount cannot be negative"]
    },
    registered: {
        type: Number,
        default: 0,
        min: [0, "Current registration cannot be negative"]
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
eventSchema.index({ location: '2dsphere' });
const EventModel = mongoose.model('Event', eventSchema);
module.exports = EventModel;