import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizModel", schema);
// console.log("hello from schema", schema);

export default model;