import type { UseFormReturn } from "react-hook-form";
import type { Question } from "../../types/form";

import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import SelectField from "./fields/SelectField";
import CheckboxGroup from "./fields/CheckboxGroup";
import FileUpload from "./fields/FileUpload";
import DateField from "./fields/DateField";

interface Props {
  question: Question;
  form: UseFormReturn<any>;
  visible: boolean;
}

export default function FieldRenderer({ question, form, visible }: Props) {
  if (!visible) return null;

  const common = { question, form };

  switch (question.type) {
    case "text":
      return <TextField {...common} />;
    case "number":
      return <NumberField {...common} />;
    case "select":
      return <SelectField {...common} />;
    case "checkbox":
      return <CheckboxGroup {...common} />;
    case "file":
      return <FileUpload {...common} />;
    case "date":
      return <DateField {...common} />;
    default:
      return null;
  }
}
