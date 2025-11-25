import { Controller, type UseFormReturn } from "react-hook-form";
import type { Question } from "../../../types/form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
}

export default function CheckboxGroup({ question, form }: Props) {
  const { control, formState: { errors } } = form;
  const err = errors[question.id]?.message as string | undefined;

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl component="fieldset" error={!!err}>
        <Controller
          control={control}
          name={question.id}
          render={({ field: { value = [], onChange } }) => (
            <FormGroup>
              {(question.options || []).map((opt) => {
                const checked = value.includes(opt);
                return (
                  <FormControlLabel
                    key={opt}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) onChange([...value, opt]);
                          else onChange(value.filter((v: string) => v !== opt));
                        }}
                        inputProps={{ "aria-label": opt }}
                      />
                    }
                    label={opt}
                  />
                );
              })}
            </FormGroup>
          )}
        />
        {err ? (
          <FormHelperText>{err}</FormHelperText>
        ) : question.helpText ? (
          <FormHelperText>{question.helpText}</FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
}
