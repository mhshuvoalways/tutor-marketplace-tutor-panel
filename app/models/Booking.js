import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const bookingModel = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "studentprofile",
    },
    tutor: {
      type: Types.ObjectId,
      ref: "tutorprofile",
    },
    date: {
      type: Date,
      required: true,
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
    session: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    tutorFee: {
      type: Number,
      required: true,
    },
    tutorJoinLink: {
      type: String,
      required: true,
    },
    studentJoinLink: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
    },
    reviewText: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.booking ?? model("booking", bookingModel);
