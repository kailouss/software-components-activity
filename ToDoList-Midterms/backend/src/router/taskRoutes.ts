import express from "express";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types/Task";

const router = express.Router();

let tasks: Task[] = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the project",
    completed: false,
    type: "basic",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Prepare presentation",
    description: "Create slides for the upcoming meeting",
    completed: false,
    type: "timed",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Weekly review",
    description: "Review tasks and plan for next week",
    completed: true,
    type: "checklist",
    createdAt: new Date().toISOString(),
  },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(task);
});

router.post("/", (req, res) => {
  const newTask: Task = {
    ...req.body,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
  };

  res.json(tasks[taskIndex]);
});

router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.status(204).send();
});

router.get("/search", (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    res.json(tasks);
    return;
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(query.toLowerCase()))
  );

  res.json(filteredTasks);
});

export default router;
