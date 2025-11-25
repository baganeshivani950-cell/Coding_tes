import type { UseFormReturn } from "react-hook-form";
import type { Question } from "../../../types/form";
import MTextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
}

export default function NumberField({ question, form }: Props) {
  const { register, formState: { errors } } = form;
  const err = errors[question.id]?.message as string | undefined;

  return (
    <Box sx={{ mb: 2 }}>
      <MTextField
        type="number"
        label={question.label + (question.required ? " *" : "")}
        {...register(question.id, {
          required: question.required ? "Required" : false,
          min: question.min !== undefined ? { value: question.min, message: `Min ${question.min}` } : undefined,
          max: question.max !== undefined ? { value: question.max, message: `Max ${question.max}` } : undefined
        })}
        fullWidth
        aria-invalid={!!err}
      />
      {err && <p style={{ color: "#d32f2f", margin: 4 }}>{err}</p>}
    </Box>
  );
}
