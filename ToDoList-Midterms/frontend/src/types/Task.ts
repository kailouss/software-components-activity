export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  type: "basic" | "timed" | "checklist";
  createdAt: string;
  dueDate?: string;
  hasReminder?: boolean;
  checklistItems?: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}
