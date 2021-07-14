import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newDate = new Date();

const UserSchema: mongoose.Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  dateOfBirth: {
    type: Date,
    default: Date(),
  },
  address: {
    type: String,
    default: "Hanoi",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("users", UserSchema);
