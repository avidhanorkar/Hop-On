// Model for Car Pooling
import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    carName: {
        type: String,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: true
    },
    pricePerSeat: {
        type: Number,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
    srcCity: {
        type: String,
        required: true
    },
    destinationCity: {
        type: String,
        required: true
    },
    deptDate: {
        type: String,
        required: true
    },
    deptTime: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        enum: ["EV", "Fuel", "CNG"],
    },
    rideStatus: {
        type: String,
        enum: ["active", "completed", "upcoming", "cancelled"],
        default: "upcoming"
    },
    passengers: [{
        passengerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        ratingGiven: Number
    }]
})

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;