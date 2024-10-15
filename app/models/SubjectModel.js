import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const subjectModel = new Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.subject ?? model("subject", subjectModel);
