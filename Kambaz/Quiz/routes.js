import * as dao from "./dao.js";
export default function QuizRoutes(app) {
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.deleteQuiz(quizId);
        res.send(status);
    });
    app.put("/api/quizzes/:quizId", async(req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });
    app.get("/api/quizzes/:quizId", async(req, res) => {
        const { quizId } = req.params;
        const status = await dao.findQuizById(quizId);
        res.send(status);
    });
}