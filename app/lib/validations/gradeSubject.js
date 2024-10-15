import { object, string } from "zod";

export const gradeSubjectSchema = object({
  item: string({ required_error: "Name is required" }).min(
    1,
    "Name is required"
  ),
});
