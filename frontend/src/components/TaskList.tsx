import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/TaskService";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Checkbox,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setTasks(await getTasks());
  }

  function startEditing(task: any) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  }

  async function save(task: any) {
    await updateTask(task.id, {
      title: editTitle,
      description: editDescription,
      isCompleted: task.isCompleted,
    });

    cancelEditing();
    load();
  }

  async function toggleComplete(task: any) {
    await updateTask(task.id, {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted,
    });

    load();
  }

  async function remove(id: number) {
    await deleteTask(id);
    load();
  }

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>

      <List>
        {tasks.map((task: any) => {
          const isEditing = editingId === task.id;

          return (
            <ListItem
              key={task.id}
              secondaryAction={
                isEditing ? (
                  <>
                    <IconButton edge="end" onClick={() => save(task)}>
                      <SaveIcon color="success" />
                    </IconButton>
                    <IconButton edge="end" onClick={cancelEditing}>
                      <CloseIcon color="error" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton edge="end" onClick={() => startEditing(task)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => remove(task.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                )
              }
            >
              {/* Checkbox */}
              <Checkbox
                checked={task.isCompleted}
                onChange={() => toggleComplete(task)}
              />

              {/* When editing: show text fields */}
              {isEditing ? (
                <Stack spacing={1} width="100%">
                  <TextField
                    label="Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                  />
                </Stack>
              ) : (
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  sx={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
