import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userid: { type: Number, required: false, unique: true }, // Alterado para Number
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    phone: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastlogin: { type: Date, default: Date.now },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;