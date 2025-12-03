import { useState } from "react";
import { createTask } from "../services/TaskService";
import { TextField, Button, Paper, Stack } from "@mui/material";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await createTask({ title, isCompleted: false });
    setTitle("");
    onAdd();
  }

  return (
    <Paper sx={{ padding: 2 }} elevation={3}>
      <form onSubmit={submit}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
