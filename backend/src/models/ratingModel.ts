import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
        required: true
    },
    raterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: 
    {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;