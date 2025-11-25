import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AssessmentPage from "./pages/AssessmentPage";

export default function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 8 }}>
        <AssessmentPage />
      </Box>
    </Container>
  );
}
