import { useEffect, useMemo, useState } from "react";
import type { UseFormWatch } from "react-hook-form";
import type { FormConfig, Question } from "../types/form";

export default function useRiskScore(watch: UseFormWatch<any>, config: FormConfig) {
  const [score, setScore] = useState(0);

  const allQuestions: Question[] = useMemo(
    () => config.sections.flatMap((s) => s.questions),
    [config]
  );

  useEffect(() => {
    const subscription = watch((values) => {
      // Sum weights for answered questions
      let obtained = 0;
      let maxPossible = 0;
      for (const q of allQuestions) {
        const weight = q.riskWeight ?? 0;
        maxPossible += weight;
        const answer = values[q.id];
        const answered = (() => {
          if (q.type === "file") return !!answer;
          if (q.type === "checkbox") return Array.isArray(answer) && answer.length > 0;
          return answer !== undefined && answer !== null && answer !== "";
        })();
        if (answered) obtained += weight;
      }
      const normalized = maxPossible > 0 ? Math.round((obtained / maxPossible) * 100) : 0;
      setScore(normalized);
    });
    // run once to initialize
    const initialValues = watch();
    let obtained = 0,
      maxPossible = 0;
    for (const q of allQuestions) {
      const weight = q.riskWeight ?? 0;
      maxPossible += weight;
      const ans = initialValues[q.id];
      if (ans) obtained += weight;
    }
    setScore(maxPossible > 0 ? Math.round((obtained / maxPossible) * 100) : 0);

    return () => (typeof subscription === "function" ? subscription : undefined);
  }, [watch, allQuestions]);

  const level = useMemo(() => {
    if (score < 30) return { label: "Low", color: "success" as const };
    if (score < 60) return { label: "Medium", color: "warning" as const };
    if (score < 85) return { label: "High", color: "error" as const };
    return { label: "Critical", color: "error" as const };
  }, [score]);

  return { score, level };
}
