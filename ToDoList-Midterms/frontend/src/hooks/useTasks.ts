import { useState, useEffect } from "react";
import type { Task } from "../types/Task";
import { TaskManager } from "../services/TaskManager";
import { TaskAdapter } from "../adapters/TaskAdapter";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await TaskAdapter.fetchTasks();
        TaskManager.setTasks(fetchedTasks);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask: Omit<Task, "id">) => {
    try {
      const addedTask = await TaskManager.addTask(newTask);
      setTasks(TaskManager.getTasks());
      return addedTask;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  const removeTask = async (id: string) => {
    try {
      await TaskManager.removeTask(id);
      setTasks(TaskManager.getTasks());
    } catch (error) {
      console.error("Error removing task:", error);
      throw error;
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    try {
      await TaskManager.toggleTaskCompletion(id);
      setTasks(TaskManager.getTasks());
    } catch (error) {
      console.error("Error toggling task completion:", error);
      throw error;
    }
  };

  return {
    tasks,
    loading,
    addTask,
    removeTask,
    toggleTaskCompletion,
  };
}
