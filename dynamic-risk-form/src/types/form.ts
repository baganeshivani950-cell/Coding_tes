export type FieldType = "text" | "number" | "select" | "checkbox" | "file" | "date";

export interface Conditional {
  questionId: string;
  answer: any;
}

export interface Question {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[];
  accept?: string; // for file
  maxSize?: number; // in MB
  min?: number;
  max?: number;
  charLimit?: number;
  riskWeight?: number;
  conditional?: Conditional | null;
  helpText?: string;
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
}

export interface FormConfig {
  sections: Section[];
}
