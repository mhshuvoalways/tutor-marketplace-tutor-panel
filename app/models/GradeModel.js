import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const gradeModel = new Schema(
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

export default models.grade ?? model("grade", gradeModel);
