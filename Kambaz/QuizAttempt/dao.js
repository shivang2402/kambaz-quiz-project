import model from "./model.js";
export function createQuizSubmission(quizSubmission) {
    delete quizSubmission._id;
    return model.create(quizSubmission)
}

export async function findAllQuizAttempt(quizId, userId) {
    const data = await model.find({ "quiz._id": quizId, user: userId });
    console.log(data);
    return data;
}

export async function findAllQuizAttemptForCourse(courseId, userId) {
    const data = await model.find({ course: courseId, user: userId });
    console.log(data);
    return data;
}