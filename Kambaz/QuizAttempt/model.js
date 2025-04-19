import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizSubmission", schema);
export default model;