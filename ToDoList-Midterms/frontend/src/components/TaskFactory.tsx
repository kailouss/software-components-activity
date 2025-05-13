import React from "react";
import type { Task } from "../types/Task";
import { BasicTask } from "./Tasks/BasicTask";
import { TimedTask } from "./Tasks/TimedTask";
import { ChecklistTask } from "./Tasks/ChecklistTask";

interface TaskFactoryProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
}

export const TaskFactory: React.FC<TaskFactoryProps> = ({
  task,
  onToggleComplete,
  onRemove,
}) => {
  switch (task.type) {
    case "timed":
      return (
        <TimedTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      );
    case "checklist":
      return (
        <ChecklistTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      );
    case "basic":
    default:
      return (
        <BasicTask
          task={task}
          onToggleComplete={onToggleComplete}
          onRemove={onRemove}
        />
      );
  }
};
