import { useState } from "react";
import type { Task } from "../types/Task";

export function useTaskForm(
  addTaskCallback: (task: Omit<Task, "id">) => Promise<Task>
) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskType, setNewTaskType] = useState<
    "basic" | "timed" | "checklist"
  >("basic");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Omit<Task, "id"> = {
      title: newTaskTitle,
      description: newTaskDescription.trim() || undefined,
      completed: false,
      type: newTaskType,
      createdAt: new Date().toISOString(),
    };

    if (newTaskType === "timed" && newTaskDueDate) {
      newTask.dueDate = new Date(newTaskDueDate).toISOString();
    }

    try {
      await addTaskCallback(newTask);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return {
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    newTaskType,
    setNewTaskType,
    newTaskDueDate,
    setNewTaskDueDate,
    handleAddTask,
  };
}
