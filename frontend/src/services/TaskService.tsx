import { TASKS_API } from "../constants";

export async function getTasks() {
  return fetch(TASKS_API).then(res => res.json());
}

export async function createTask(task: any) {
  return fetch(TASKS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  }).then(res => res.json());
}

export async function deleteTask(id: number) {
  return fetch(`${TASKS_API}/${id}`, { method: "DELETE" });
}

export const updateTask = (id: number, task: any) =>
  fetch(`${TASKS_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  }).then((r) => r.json());

