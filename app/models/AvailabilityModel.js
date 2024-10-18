import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const availabilityModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    day: {
      type: String,
      required: true,
      trim: true,
    },
    startedTime: {
      type: String,
      required: true,
      trim: true,
    },
    endedTime: {
      type: String,
      required: true,
      trim: true,
    },
    timeZone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.availability ?? model("availability", availabilityModel);
