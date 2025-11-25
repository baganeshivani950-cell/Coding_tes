import { Controller, type UseFormReturn } from "react-hook-form";
import type { Question } from "../../../types/form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
}

export default function SelectField({ question, form }: Props) {
  const { control, formState: { errors } } = form;
  const err = errors[question.id]?.message as string | undefined;

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth error={!!err}>
        <InputLabel id={`${question.id}-label`}>{question.label + (question.required ? " *" : "")}</InputLabel>
        <Controller
          control={control}
          name={question.id}
          rules={{ required: question.required ? "Required" : false }}
          render={({ field }) => (
            <Select labelId={`${question.id}-label`} label={question.label} {...field}>
              {(question.options || []).map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {err ? <FormHelperText>{err}</FormHelperText> : question.helpText ? <FormHelperText>{question.helpText}</FormHelperText> : null}
      </FormControl>
    </Box>
  );
}
