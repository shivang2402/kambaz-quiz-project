// import Database from "../Database/index.js";
import model from "./model.js";
export function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
}
export function createQuiz(quiz) {
    return model.create(quiz);
}
export function deleteQuiz(quizId) {
    return model.findByIdAndDelete(quizId);
}

export function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, quizUpdates);
}

export async function findQuizForUser(quizId) {
    const data= await model.findOne({ _id: quizId});
    return data
}

export async function findQuizById(quizId){
    const quiz = await model.findOne({ _id: quizId });
    console.log("Full quiz document:", JSON.stringify(quiz, null, 2));
    return quiz;
}