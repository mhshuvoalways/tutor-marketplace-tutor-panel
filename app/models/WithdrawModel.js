import mongoose from "mongoose";
const { Schema, model, models, Types } = mongoose;

const withdrawModel = new Schema(
  {
    tutor: {
      type: Types.ObjectId,
      ref: "auth",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.withdraw ?? model("withdraw", withdrawModel);
