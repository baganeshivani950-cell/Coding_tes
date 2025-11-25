import React from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { FormConfig } from "../../types/form";
import SectionRenderer from "./SectionRenderer";
import { Button, Box, Typography } from "@mui/material";
import useAutoSave from "../../hooks/useAutoSave";

interface Props {
  config: FormConfig;
  onSubmit?: (values: any) => void;
  formInstance?: UseFormReturn<any>; // optional external form
}

export default function DynamicForm({ config, onSubmit, formInstance }: Props) {
  const internalForm = useForm({ mode: "onChange" });
  const form = formInstance ?? internalForm;

  const { lastSaved, manualSave, restore } = useAutoSave(form.getValues);

  React.useEffect(() => {
    const restored = restore();
    if (restored) {
      form.reset(restored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (values: any) => {
    if (onSubmit) onSubmit(values);
    manualSave();
    alert("Form submitted (demo). Check console for values.");
    console.log("Submitted values:", values);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} aria-live="polite">
      <SectionRenderer config={config} form={form} />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained">Submit</Button>
        <Button type="button" variant="outlined" onClick={() => manualSave()}>Save draft</Button>
        <Box sx={{ flex: 1 }} />
        {lastSaved ? (
          <Typography variant="caption">Last saved: {lastSaved.toLocaleTimeString()}</Typography>
        ) : (
          <Typography variant="caption">Not saved yet</Typography>
        )}
      </Box>
    </form>
  );
}
