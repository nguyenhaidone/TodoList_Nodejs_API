import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ListSchema: mongoose.Schema = new Schema({
  title: {
    type: String,
    default: "Enter your title task",
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    default: "Your description",
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default mongoose.model("list", ListSchema);
