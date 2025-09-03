import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pnr: {
        type: String,
        required: true,
        unique: true
    },
    busServiceProviderName: {
        type: String,
        required: true
    },
    busNo: {
        type: String,
        required: true
    },
    seatNo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "sold", "auction"],
        default: "available",
        required: true
    },
    compatibleGender: {
        type: String,
        enum: ["male", "female"],
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
        type: Date,
        required: true
    },
    deptTime: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    auction: {
        type: {
            startTime: {
                type: Date,
            },
            endTime: {
                type: Date,
            },
            highestBid: {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                amount: Number
            },
            bids: [{
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                amount: Number
            }],
        }, 
        default: {}
    },
    ticketPdf: {
        type: String
    }
})

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;