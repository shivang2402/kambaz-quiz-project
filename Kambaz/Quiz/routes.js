import * as dao from "./dao.js";
export default function QuizRoutes(app) {

    app.post("/api/quizzes/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const quizData = req.body;
      console.log("Create Quiz says hello");
      
        try {
          quizData.course = courseId;              
          quizData._id = new Date().getTime().toString();  
          const created = await dao.createQuiz(quizData);
          res.json(created);
        } catch (err) {
          console.error(err);                       
          res.status(500).send({ error: err.message });
        }
      });
      

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
    app.get("/api/quizzes/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        console.log("Find Quiz says hello");

        try {
          const quizzes = await dao.findQuizzesForCourse(courseId);
          res.json(quizzes);
        } catch (err) {
          res.status(500).send({ error: err.message });
        }
      });
      
}