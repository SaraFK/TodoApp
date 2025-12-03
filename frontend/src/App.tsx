import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { Container, Typography, Box } from "@mui/material";

export default function App() {
  const reload = () => window.location.reload();

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h3" gutterBottom>
          Task Manager
        </Typography>

        <AddTaskForm onAdd={reload} />
        <TaskList />
      </Box>
    </Container>
  );
}
