const answerButtons = Array.from(document.querySelectorAll(".quiz__answer"));
const submitButton = document.querySelector(".quiz__submit");

if (answerButtons.length && submitButton) {
  let selectedAnswer = null;
  let hasSubmitted = false;

  const clearAnswerStates = () => {
    answerButtons.forEach((answer) => {
      answer.classList.remove(
        "quiz__answer--selected",
        "quiz__answer--correct",
        "quiz__answer--wrong"
      );
    });
  };

  const setSubmitState = (modifier, label) => {
    submitButton.classList.remove(
      "quiz__submit--disabled",
      "quiz__submit--active",
      "quiz__submit--next"
    );
    submitButton.classList.add(modifier);
    submitButton.textContent = label;
    submitButton.disabled = modifier === "quiz__submit--disabled";
  };

  const resetQuiz = () => {
    selectedAnswer = null;
    hasSubmitted = false;
    clearAnswerStates();
    setSubmitState("quiz__submit--disabled", "Submit Answer");
  };

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (hasSubmitted) {
        return;
      }

      selectedAnswer = button;
      clearAnswerStates();
      button.classList.add("quiz__answer--selected");
      setSubmitState("quiz__submit--active", "Submit Answer");
    });
  });

  submitButton.addEventListener("click", () => {
    if (!selectedAnswer) {
      return;
    }

    if (hasSubmitted) {
      resetQuiz();
      return;
    }

    hasSubmitted = true;
    clearAnswerStates();

    const correctAnswer = answerButtons.find(
      (answer) => answer.dataset.correct === "true"
    );

    if (selectedAnswer.dataset.correct === "true") {
      selectedAnswer.classList.add("quiz__answer--correct");
    } else {
      selectedAnswer.classList.add("quiz__answer--wrong");

      if (correctAnswer) {
        correctAnswer.classList.add("quiz__answer--correct");
      }
    }

    setSubmitState("quiz__submit--next", "Next");
  });
}
