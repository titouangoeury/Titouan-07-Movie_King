const answerButtons = document.querySelectorAll(".quiz__answer");
const submitButton = document.querySelector(".quiz__submit");

if (answerButtons.length && submitButton) {
  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      answerButtons.forEach((answer) => answer.classList.remove("is-selected"));
      button.classList.add("is-selected");
      submitButton.disabled = false;
    });
  });
}
