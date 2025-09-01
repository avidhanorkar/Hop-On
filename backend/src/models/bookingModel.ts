import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
    },
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ride",
    },
    bookingStatus: { // only for rides and not for tickets as it booked via bids or else it is booked directly sometimes
        type: String,
        enum: ["pending", "booked", "cancelled"],
        default: "pending"
    }
})

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;