import mongoose from "mongoose";

// For choices inside MCQ questions
const choiceSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
}, { _id: false });

// For each question in the quiz snapshot
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  type: {
    type: String,
    enum: ["mcq", "tf", "fib", "Multiple Choice"],
    required: true
  },
  choices: [choiceSchema],            // For MCQ
  answer: { type: String },           // For TF
  possibleAnswers: [String],          // For FIB
  points: { type: Number, default: 1 }
}, { _id: false });

// Embedded quiz snapshot (title, course, questions)
const quizSnapshotSchema = new mongoose.Schema({
    _id: String,
  title: String,
  course: String,
  questions: [questionSchema]
}, { _id: false });

// Student responses
const responseSchema = new mongoose.Schema({
  questionId: { type: String },   // assuming _id from frontend might be UUID/string
  type: { type: String, enum: ["mcq", "tf", "fib"] },
  answer: { type: String }
}, { _id: false });

// Final submission schema
const schema = new mongoose.Schema({
  user: { type: String, required: true },      // or ObjectId if you use refs
  course: { type: String, required: true },
  quiz: quizSnapshotSchema,                   // entire quiz embedded here
  responses: [responseSchema],
  score: Number,
  timeBegin: { type: String },
  submittedAt: { type: String }
}, {
  timestamps: true,
  collection: "quiz_submissions"
});

export default schema;

