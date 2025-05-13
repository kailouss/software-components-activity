import type { Task } from "../types/Task";

export class TaskSortingStrategy {
  static sortById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }

  static sortByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  static sortByDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }
}
