import type { Task } from "../../types/Task";

export class TaskDecorator {
  public static withReminder(task: Task): Task & { hasReminder: boolean } {
    return {
      ...task,
      hasReminder: true,
    };
  }

  public static withPriority(
    task: Task,
    priority: "low" | "medium" | "high"
  ): Task & { priority: string } {
    return {
      ...task,
      priority,
    };
  }
}
