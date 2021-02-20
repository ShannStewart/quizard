
const findUser = (users=[], userId) =>
users.find(user => user.id === userId)

const findQuiz = (quizzes=[], quizId) =>
quizzes.find(quiz => quiz.id === quizId)

const findQuestion = (questions=[], questionId) =>
questions.find(question => question.id === questionId)

const getQuizzesForUsers = (quizzes=[], userId) => (
(!userId)
  ? quizzes
  : quizzes.filter(quiz => quiz.userId === userId)
)

const getQuestionsForUsers = (questions=[], userId) => (
    (!userId)
      ? questions
      : questions.filter(question => question.userId === userId)
    )

const getQuestionsforQuizzes = (questions=[], quizId) => (
    (!quizId)
        ? questions
        : questions.filter(question => question.quizId === quizId)
)

const countQuizzesForUser = (quizzes=[], userId) =>
quizzes.filter(quiz => quiz.userId === userId).length

const countQuestionsForUser = (questions=[], userId) =>
questions.filter(question => question.userId === userId).length

const countQuestionsForQuiz = (questions=[], quizId) =>
questions.filter(question => question.quizId === quizId).length

