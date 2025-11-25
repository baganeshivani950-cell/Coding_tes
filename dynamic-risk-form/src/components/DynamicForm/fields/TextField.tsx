import type { UseFormReturn } from "react-hook-form";
import type { Question } from "../../../types/form";
import MTextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
}

export default function TextField({ question, form }: Props) {
  const { register, formState: { errors } } = form;
  const err = errors[question.id]?.message as string | undefined;
  return (
    <Box sx={{ mb: 2 }}>
      <MTextField
        label={question.label + (question.required ? " *" : "")}
        {...register(question.id, {
          required: question.required ? "Required" : false,
          maxLength: question.charLimit ? { value: question.charLimit, message: `Max ${question.charLimit} chars` } : undefined
        })}
        fullWidth
        multiline
        minRows={2}
        inputProps={{ maxLength: question.charLimit }}
        aria-invalid={!!err}
      />
      {question.helpText && <FormHelperText>{question.helpText}</FormHelperText>}
      {err && <FormHelperText error>{err}</FormHelperText>}
    </Box>
  );
}
