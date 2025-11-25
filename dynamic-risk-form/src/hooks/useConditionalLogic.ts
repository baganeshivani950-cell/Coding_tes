import { useEffect, useRef, useState } from "react";
import type { UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { Question } from "../types/form";

/**
 * watch: RHF watch function
 * setValue: RHF setValue (so we can clear values when hidden)
 * question: the question object with optional conditional
 *
 * Returns boolean visible.
 */
export default function useConditionalLogic(
  watch: UseFormWatch<any>,
  setValue: UseFormSetValue<any>,
  question: Question
) {
  const [visible, setVisible] = useState(true);
  const prevVisible = useRef<boolean | null>(null);

  useEffect(() => {
    if (!question.conditional) {
      setVisible(true);
      prevVisible.current = true;
      return;
    }

    // Subscribe safely (RHF types sometimes return never for subscription)
    const unsubscribe = (watch as any)((values: any) => {
      const val = values?.[question.conditional!.questionId];
      setVisible(val === question.conditional!.answer);
    });

    // initial check
    const initial = watch(question.conditional.questionId);
    setVisible(initial === question.conditional.answer);
    prevVisible.current = initial === question.conditional.answer;

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [watch, question]);

  // Clear value when becomes hidden (so validation won't trigger)
  useEffect(() => {
    if (prevVisible.current === null) {
      prevVisible.current = visible;
      return;
    }
    if (prevVisible.current === true && visible === false) {
      // Became hidden -> clear value
      setValue(question.id, undefined, { shouldValidate: false, shouldDirty: true });
    }
    prevVisible.current = visible;
  }, [visible, question.id, setValue]);

  return visible;
}
