
export const findUser = (users=[], userId) =>
users.find(user => user.id == userId)

export const findQuiz = (quizzes=[], quizId) =>
quizzes.find(quiz => quiz.id == quizId)

export const findQuestion = (questions=[], questionId) =>
questions.find(question => question.id == questionId)

export const getQuizzesForUsers = (quizzes=[], userId) => (
  (!userId)
  ? quizzes
  : quizzes.filter(quiz => quiz.userid == userId)
)

export const getQuestionsForUsers = (questions=[], userId) => (
    (!userId)
      ? questions
      : questions.filter(question => question.userid == userId)
    )

export const getQuestionsforQuizzes = (questions=[], quizId) => (
    (!quizId)
        ? questions
        : questions.filter(question => question.test == quizId)
)

export const countQuizzesForUser = (quizzes=[], userId) =>
quizzes.filter(quiz => quiz.userid == userId).length

export const countQuestionsForUser = (questions=[], userId) =>
questions.filter(question => question.userid == userId).length

export const countQuestionsForQuiz = (questions=[], quizId) =>
questions.filter(question => question.test == quizId).length

