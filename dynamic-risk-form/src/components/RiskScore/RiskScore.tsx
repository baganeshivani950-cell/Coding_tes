import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function RiskScore({ score, level }: { score: number; level: { label: string; color: "success" | "warning" | "error" } }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle1">Risk Score: {score}%</Typography>
        <Chip label={level.label} color={level.color} size="small" />
      </Box>
      <LinearProgress variant="determinate" value={score} aria-label={`Risk score ${score}%`} />
    </Box>
  );
}
