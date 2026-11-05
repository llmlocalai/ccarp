"use client";

import { useEffect } from "react";

export default function QuizScript() {
  useEffect(() => {
    (window as any).revealQuiz = function (btn: HTMLElement, correctId: string) {
      const quiz = btn.closest(".quiz");
      if (!quiz) return;
      quiz.querySelectorAll(".opt").forEach((o) => {
        if ((o as HTMLElement).dataset.id === correctId) o.classList.add("correct");
      });
      const rat = quiz.querySelector(".rationale");
      if (rat) rat.classList.add("show");
      (btn as HTMLButtonElement).disabled = true;
      btn.textContent = "Revealed";
    };
    (window as any).pickOpt = function (el: HTMLElement, correctId: string) {
      const quiz = el.closest(".quiz");
      if (!quiz) return;
      quiz.querySelectorAll(".opt").forEach((o) => o.classList.remove("correct", "wrong"));
      if (el.dataset.id === correctId) {
        el.classList.add("correct");
      } else {
        el.classList.add("wrong");
        quiz.querySelectorAll(".opt").forEach((o) => {
          if ((o as HTMLElement).dataset.id === correctId) o.classList.add("correct");
        });
      }
      const rat = quiz.querySelector(".rationale");
      if (rat) rat.classList.add("show");
    };
  }, []);
  return null;
}
