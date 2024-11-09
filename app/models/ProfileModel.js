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
      address: String,
      lat: Number,
      lng: Number,
    },
    miles: Number,
    session: {
      type: Number,
      default: 1,
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
    isApproved: {
      type: Boolean,
      default: false,
    },
    balance: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    tutorStripeAccountId: String,
  },
  {
    timestamps: true,
  }
);

export default models.tutorprofile ?? model("tutorprofile", profileModel);
