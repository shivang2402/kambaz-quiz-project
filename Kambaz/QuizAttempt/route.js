import * as quizSubmissionDao from "./dao.js"
import * as quizzesDao from "../Quiz/dao.js"

export default function QuizSubmissionRoute(app) {
    app.post("/api/quizzes/submissions", async (req, res) => {

        const quizAttempt = { ...req.body };

        
        const existingAttempts = await quizSubmissionDao.findAllQuizAttempt(
            quizAttempt.quiz,
            quizAttempt.user
        );

        console.log("Hi There!")
        console.log(existingAttempts)
        console.log(existingAttempts.length)

        if (existingAttempts.length > 0) {
            return res.status(400).json({ message: "You have already attempted this quiz." });
        }

        // Fetch quiz metadata to embed
        const quizDoc = await quizzesDao.findQuizById(quizAttempt.quiz);
        if (!quizDoc) return res.status(404).send("Quiz not found");

        // Normalize quiz data to make it schema-safe
        const normalizedQuestions = quizDoc.questions.map(q => ({
            _id: q._id,
            title: q.title,
            question: q.question,
            points: q.points,
            type:
                q.type === "Multiple Choice" ? "mcq" :
                    q.type === "True / False" ? "tf" :
                        q.type === "Fill in the Blank" ? "fib" :
                            q.type, // fallback

            choices: Array.isArray(q.choices)
                ? q.choices.filter(c => typeof c === "object" && c !== null)
                : [],
            possibleAnswers: Array.isArray(q.possibleAnswers) ? q.possibleAnswers : [],
            answer: q.answer
        }));

        quizAttempt.quiz = {
            _id: quizDoc._id,     
            title: quizDoc.title,
            course: quizDoc.course,
            questions: normalizedQuestions
        };

        const quiz = quizDoc;
        let score = 0
        quiz.questions.forEach((question) => {
            const response = quizAttempt.responses.find(r => r.questionId === question._id.toString());
            if (response) {
                if (question.type === "mcq") {
                    const correctChoice = question.choices.find(choice => choice.isCorrect === true);
                    if (correctChoice && correctChoice.answer === response.answer) {
                        score += question.points;
                    }
                } else if (question.type === "tf") {
                    // Ensuring both are treated as strings for comparison, or convert both to boolean if necessary
                    if (question.answer.toString() === response.answer.toString()) {
                        score += question.points;
                    }
                } else if (question.type === "fib") {
                    // Assuming possibleAnswers is an array of strings
                    if (question.possibleAnswers.map(answer => answer.toLowerCase()).includes(response.answer.toLowerCase())) {
                        score += question.points;
                    }
                }
            }
        });
        quizAttempt.score = score
        console.log(quizAttempt.score);
        const attempt = await quizSubmissionDao.createQuizSubmission(quizAttempt);
        res.send(attempt);
    });

    app.post("/api/quizzes/attempt", async (req, res) => {
        const quizId = req.body.quizId;
        const userId = req.body.userId;
        const attemps = await quizSubmissionDao.findAllQuizAttempt(quizId, userId);
        res.send(attemps);
    });

    app.post("/api/quizzes/all-attempts-for-course", async (req, res) => {
        const courseId = req.body.courseId;
        const userId = req.body.userId;
        const fetchedAttempts = await quizSubmissionDao.findAllQuizAttemptForCourse(courseId, userId);
        console.log("Fetched Attempts: ", fetchedAttempts);

        const latestAttempts = fetchedAttempts.reduce((accumulator, currentAttempt) => {
            const quizId = currentAttempt.quiz?._id || currentAttempt.quiz?.title || Math.random(); // fallback key
            const currentSubmittedDate = new Date(currentAttempt.submittedAt);

            if (
                !accumulator[quizId] ||
                new Date(accumulator[quizId].submittedAt) < currentSubmittedDate
            ) {
                accumulator[quizId] = currentAttempt;
            }

            return accumulator;
        }, {});

        res.send(Object.values(latestAttempts));
    });

}