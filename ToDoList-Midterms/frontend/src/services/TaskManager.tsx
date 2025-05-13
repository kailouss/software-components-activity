import type { Task } from "../types/Task";
import { TaskAdapter } from "../adapters/TaskAdapter";

class TaskManagerClass {
  private tasks: Task[] = [];
  private static instance: TaskManagerClass;

  private constructor() {}

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass();
    }
    return TaskManagerClass.instance;
  }

  public setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public async addTask(task: Omit<Task, "id">): Promise<Task> {
    const newTask = await TaskAdapter.createTask(task);
    this.tasks.push(newTask);
    return newTask;
  }

  public async removeTask(id: string): Promise<void> {
    await TaskAdapter.deleteTask(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public async toggleTaskCompletion(id: string): Promise<void> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    await TaskAdapter.updateTask(id, updatedTask);

    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
  }

  public async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) return;

    const updatedTask = { ...task, ...updates };
    await TaskAdapter.updateTask(id, updatedTask);

    this.tasks = this.tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
  }

  public searchTasks(query: string): Task[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseQuery) ||
        (task.description &&
          task.description.toLowerCase().includes(lowerCaseQuery))
    );
  }
}

export const TaskManager = TaskManagerClass.getInstance();
