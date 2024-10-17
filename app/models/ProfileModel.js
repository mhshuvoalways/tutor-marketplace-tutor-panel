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
      public_id: String,
    },
    name: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    hourlyRate: {
      type: Number,
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
