import { useEffect, useState } from "react";
import type { UseFormGetValues } from "react-hook-form";

const DRAFT_KEY = "risk_form_draft_v1";

export default function useAutoSave(getValues: UseFormGetValues<any>) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = getValues();
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ data, savedAt: new Date().toISOString() })
      );
      setLastSaved(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [getValues]);

  const manualSave = () => {
    const data = getValues();
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ data, savedAt: new Date().toISOString() })
    );
    setLastSaved(new Date());
  };

  const restore = () => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw).data;
    } catch {
      return null;
    }
  };

  return { lastSaved, manualSave, restore };
}
