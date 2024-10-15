import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const authModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    isVerfied: {
      type: String,
      default: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export default models.auth ?? model("auth", authModel);
