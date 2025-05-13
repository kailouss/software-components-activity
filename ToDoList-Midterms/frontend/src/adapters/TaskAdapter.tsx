import type { Task } from "../types/Task";

export class TaskAdapter {
  private static API_URL = "http://localhost:3001/api/tasks";

  static async fetchTasks(): Promise<Task[]> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  static async createTask(task: Omit<Task, "id">): Promise<Task> {
    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  static async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  static async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }
}
