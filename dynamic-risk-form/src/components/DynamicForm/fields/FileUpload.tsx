import React, { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { Question } from "../../../types/form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { validatePdfFile } from "../../../utils/fileValidation";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
}

export default function FileUpload({ question, form }: Props) {
  const { register, setValue, watch, formState: { errors } } = form;
  const current = watch(question.id);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const valid = validatePdfFile(file, question.maxSize ?? 10);
    if (valid !== true) {
      setValue(question.id, undefined);
      return alert(valid);
    }

    // simulate progress
    setUploading(true);
    setProgress(10);

    const tick = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 30));
    }, 300);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 1200));

    clearInterval(tick);
    setProgress(100);

    setTimeout(() => {
      setUploading(false);
      setProgress(0);
      setValue(question.id, {
        name: file.name,
        size: file.size,
        type: file.type
      });
    }, 300);
  };

  const removeFile = () => {
    setValue(question.id, undefined);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1">
        {question.label}
        {question.required ? " *" : ""}
      </Typography>

      <input
        {...register(question.id)}
        type="file"
        accept={question.accept || ".pdf"}
        onChange={onFileChange}
        aria-label={question.label}
      />

      {uploading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mt: 1 }}
        />
      )}

      {current && (
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">{current.name}</Typography>
          <IconButton aria-label="remove" onClick={removeFile} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {errors[question.id] && (
        <Typography color="error">
          {String(errors[question.id]?.message)}
        </Typography>
      )}
    </Box>
  );
}
