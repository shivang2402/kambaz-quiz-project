import mongoose from "mongoose";

// Question Schema
const questionSchema = new mongoose.Schema({
  _id: { type: String },
  type: {
    type: String,
    required: true,
    enum: ["mcq", "tf", "fib"],
  },
  title: { type: String },
  points: { type: Number },
  question: { type: String, required: true },
  choices: [
    {
      answer: { type: String },
      isCorrect: { type: Boolean },
    },
  ],
  answer: { type: Boolean },
  possibleAnswers: [{ type: String }],
});

// Settings Schema
const settingsSchema = new mongoose.Schema({
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: {
    enabled: { type: Boolean, default: false },
    attemptsAllowed: { type: Number, default: 1 },
  },
  showCorrectAnswers: {
    enabled: { type: Boolean, default: false },
    timing: { type: String, default: null },
  },
  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },
});

// Dates Schema
const datesSchema = new mongoose.Schema({
  due: String,
  available: String,
  until: String,
});

// Main Quiz Schema
const schema = new mongoose.Schema(
  {
    _id: { type: String },
    title: String,
    description: String, // ✅ Added to match frontend
    course: { type: String, ref: "CourseModel" },
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    },
    points: Number,
    assignmentGroup: String,
    settings: settingsSchema,
    dates: datesSchema,
    isPublished: { type: Boolean, default: false },
    questions: [questionSchema],
  },
  { collection: "quiz" }
);

export default schema;
