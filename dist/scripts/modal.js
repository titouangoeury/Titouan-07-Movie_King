const modalElements = document.querySelectorAll(".modal");
const modalState = {
  activeModal: null,
  trigger: null,
};

const openModalById = (modalId, trigger = null) => {
  const nextModal = document.getElementById(modalId);

  if (!nextModal) {
    return;
  }

  if (modalState.activeModal && modalState.activeModal !== nextModal) {
    closeModal(modalState.activeModal, false);
  }

  modalState.activeModal = nextModal;
  modalState.trigger = trigger;

  nextModal.classList.add("is-open");
  nextModal.setAttribute("aria-hidden", "false");

  if (trigger) {
    trigger.setAttribute("aria-expanded", "true");
  }

  document.body.classList.add("modal-open");

  const panel = nextModal.querySelector(".modal__panel");
  panel?.focus();
};

function closeModal(modal, restoreFocus = true) {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  if (modalState.trigger && restoreFocus) {
    modalState.trigger.setAttribute("aria-expanded", "false");
    modalState.trigger.focus();
  } else if (modalState.trigger) {
    modalState.trigger.setAttribute("aria-expanded", "false");
  }

  if (modalState.activeModal === modal) {
    modalState.activeModal = null;
    modalState.trigger = null;
  }

  const hasOpenModal = document.querySelector(".modal.is-open");

  if (!hasOpenModal) {
    document.body.classList.remove("modal-open");
  }
}

document.querySelectorAll("[aria-controls]").forEach((trigger) => {
  const targetModalId = trigger.getAttribute("aria-controls");

  trigger.addEventListener("click", () => {
    openModalById(targetModalId, trigger);
  });
});

document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
  const targetModalId = trigger.getAttribute("data-open-modal");

  trigger.addEventListener("click", () => {
    openModalById(targetModalId, trigger);
  });
});

modalElements.forEach((modal) => {
  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(modal);
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalState.activeModal) {
    closeModal(modalState.activeModal);
  }
});

const categoryButtons = document.querySelectorAll(".modal__choice");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((choice) => {
      choice.classList.remove("is-active");
      choice.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
  });
});
