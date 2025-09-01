import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'driver'],
        default: "user"
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: "male"
    },
    rating: {
        avgRating:Number,
        totalRating: Number
    }
});

const User = mongoose.model("User", userSchema);

export default User;