import type React from "react";
import type { Task } from "../types/Task";
import { Notification } from "../components/Notification";

interface TaskObserverProps {
  task: Task;
}

export const TaskObserver: React.FC<TaskObserverProps> = ({ task }) => {
  if (!task.dueDate || task.completed) return null;

  const isOverdue = new Date(task.dueDate) < new Date();

  if (isOverdue) {
    return (
      <div className="mr-2">
        <Notification message="This task is OVERDUE!" type="warning" />
      </div>
    );
  }

  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const timeDiff = dueDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  if (hoursDiff <= 24) {
    return (
      <div className="mr-2 font-bold">
        <Notification message="Due soon!" type="info" />
      </div>
    );
  }

  return null;
};
