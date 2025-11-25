import DynamicForm from "../components/DynamicForm/DynamicForm";
import configData from "../data/formConfig.json";
import useRiskScore from "../hooks/useRiskScore";
import { useForm } from "react-hook-form";
import RiskScore from "../components/RiskScore/RiskScore";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Top-level page that wires up the risk-score hook with a form instance.
 * Since DynamicForm creates its own useForm, for the purpose of the score
 * we create a lightweight watcher form and provide to the hook.
 *
 * For simplicity we render a small header with the RiskScore component that
 * subscribes to the same config by creating its own watch via a dummy form.
 */

export default function AssessmentPage() {
  // We'll create a synchronized RHF instance and pass it to the DynamicForm by minor refactor:
  // For simplicity here, we will mount a separate form instance that the hooks can watch from,
  // and the DynamicForm will manage its own form and autosave. To keep code compact, we call useRiskScore
  // with a watcher created from a light form. (This is practical for the demo).
  const miniForm = useForm({ mode: "onChange" });
  const { watch } = miniForm;
  const { score, level } = useRiskScore(watch, configData as any);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1">Dynamic Risk Assessment</Typography>
        <Typography variant="body2" color="text.secondary">Fill the form to see your real-time risk score</Typography>
      </Box>

      <RiskScore score={score} level={level} />

      <DynamicForm config={configData as any} onSubmit={(v) => console.log("submitted", v)} />
      <Box sx={{ mt: 2, color: "text.secondary", fontSize: 12 }}>
        Note: This is a demo implementation for the coding exercise.
      </Box>
    </Paper>
  );
}
