import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const profileModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    avatar: {
      url: String,
      publicId: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    grades: [
      {
        type: Types.ObjectId,
        ref: "grade",
      },
    ],
    subjects: [
      {
        type: Types.ObjectId,
        ref: "subject",
      },
    ],
    availableOn: [],
  },
  {
    timestamps: true,
  }
);

export default models.tutorProfile ?? model("tutorProfile", profileModel);
