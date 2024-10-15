import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const profileModel = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "auth",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.adminProfile ?? model("adminProfile", profileModel);
