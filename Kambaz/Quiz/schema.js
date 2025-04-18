import mongoose from "mongoose";

// Define Question Schema
const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["mcq", "tf", "fib"], // Only allow specific question types
    },
    title: { type: String },
    points: { type: Number },
    question: { type: String, required: true },
    choices: [ // For mcq questions
        {
            answer: { type: String, required: false },
            isCorrect: { type: Boolean, required: false },
        },
    ],
    answer: { type: Boolean, required: false }, // For true/false questions
    possibleAnswers: [{ type: String, required: false }], // For fill-in-the-blank questions
});

// Define Settings Schema
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

// Define Dates Schema
const datesSchema = new mongoose.Schema({
    due: String,
    available: String,
    until: String
});

// Define Quiz Schema
const schema = new mongoose.Schema(
    {
        _id: { type: String },
        title: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        quizType: {
            type: String,
            enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"], // Extendable types
        },
        points: Number,
        assignmentGroup: String,
        settings: settingsSchema, // Embed settings schema
        dates: datesSchema, // Embed dates schema
        isPublished: { type: Boolean, default: false },
        questions: [questionSchema], // Array of questions
    },
    { collection: "quizzes" }
);

export default schema;