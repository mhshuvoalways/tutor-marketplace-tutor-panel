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
  },
  {
    timestamps: true,
  }
);

export default models.studentprofile ?? model("studentprofile", profileModel);
