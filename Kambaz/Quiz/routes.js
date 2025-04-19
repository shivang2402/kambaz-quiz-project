// import * as dao from "./dao.js";
// export default function QuizRoutes(app) {

//     app.post("/api/quizzes/course/:courseId", async (req, res) => {
//         const { courseId } = req.params;
//         const quizData = req.body;
//       console.log("Create Quiz says hello");
      
//         try {
//           quizData.course = courseId;              
//           quizData._id = new Date().getTime().toString();  
//           const created = await dao.createQuiz(quizData);
//           res.json(created);
//         } catch (err) {
//           console.error(err);                       
//           res.status(500).send({ error: err.message });
//         }
//       });
      

//     app.delete("/api/quizzes/:quizId", async (req, res) => {
//         const { quizId } = req.params;
//         const status = await dao.deleteQuiz(quizId);
//         res.send(status);
//     });
//     app.put("/api/quizzes/:quizId", async(req, res) => {
//         const { quizId } = req.params;
//         const quizUpdates = req.body;
//         const status = await dao.updateQuiz(quizId, quizUpdates);
//         res.send(status);
//     });
//     app.get("/api/quizzes/course/:courseId", async (req, res) => {
//         const { courseId } = req.params;
//         console.log("Find Quiz says hello");

//         try {
//           const quizzes = await dao.findQuizzesForCourse(courseId);
//           res.json(quizzes);
//         } catch (err) {
//           res.status(500).send({ error: err.message });
//         }
//       });
      
// }


import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  // CREATE a quiz
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

  // UPDATE an existing quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    console.log("Update Quiz says hello");

    try {
      const result = await dao.updateQuiz(quizId, quizUpdates);
      if (result.modifiedCount === 0) {
        return res.status(404).send({ error: "Quiz not found or unchanged" });
      }
      const updatedQuiz = await dao.findQuizById(quizId);
      res.json(updatedQuiz);
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).send({ error: err.message });
    }
  });
// DELETE a quiz
app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    console.log("Delete Quiz says hello");

    try {
      const deleted = await dao.deleteQuiz(quizId);
  
      if (deleted.deletedCount === 0) {
        return res.status(404).json({ error: "Quiz not found." });
      }
  
      res.status(200).json({ message: "Quiz deleted successfully." });
    } catch (err) {
      console.error("Error deleting quiz:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });
  

  // GET all quizzes for a course
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

  // GET quiz by ID
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await dao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).send({ error: "Quiz not found" });
      }
      res.json(quiz);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
}
