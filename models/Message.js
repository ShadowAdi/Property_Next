import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipent: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    body: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
