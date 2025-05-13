import { useState, useMemo } from "react";
import type { Task } from "../types/Task";
import { TaskSortingStrategy } from "../strategies/TaskSortingStrategy";

export function useTaskSorting(tasks: Task[]) {
  const [sortStrategy, setSortStrategy] = useState<"date" | "name" | "id">(
    "id"
  );

  const sortedTasks = useMemo(() => {
    switch (sortStrategy) {
      case "date":
        return TaskSortingStrategy.sortByDate([...tasks]);
      case "name":
        return TaskSortingStrategy.sortByName([...tasks]);
      case "id":
      default:
        return TaskSortingStrategy.sortById([...tasks]);
    }
  }, [tasks, sortStrategy]);

  return {
    sortStrategy,
    setSortStrategy,
    sortedTasks,
  };
}
