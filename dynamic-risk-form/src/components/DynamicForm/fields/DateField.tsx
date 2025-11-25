import { Controller, type UseFormReturn } from "react-hook-form";
import type { Question } from "../../../types/form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
}

export default function DateField({ question, form }: Props) {
  const { control, formState: { errors } } = form;
  const err = errors[question.id]?.message as string | undefined;

  return (
    <Box sx={{ mb: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name={question.id}
          control={control}
          rules={{ required: question.required ? "Required" : false }}
          render={({ field }) => (
            <DatePicker
              label={`${question.label}${question.required ? " *" : ""}`}
              value={field.value || null}
              onChange={(v) => field.onChange(v)}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!err,
                  helperText: err
                }
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
