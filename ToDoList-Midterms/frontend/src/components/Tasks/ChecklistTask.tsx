import type React from "react";
import { useState } from "react";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  TrashIcon,
  ClockIcon,
  ListBulletIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import type { Task } from "../../types/Task";
import { TaskDecorator } from "../decorators/TaskDecorator";
import { TaskObserver } from "../../observers/TaskObserver";
import { TaskManager } from "../../services/TaskManager";

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ChecklistTaskProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
}

export const ChecklistTask: React.FC<ChecklistTaskProps> = ({
  task,
  onToggleComplete,
  onRemove,
}) => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItemText, setEditingItemText] = useState("");
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const DecoratedTask = task.dueDate ? TaskDecorator.withReminder(task) : task;

  const toggleItem = (itemId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now(),
      text: newSubtask,
      completed: false,
    };

    setItems((prev) => [...prev, newItem]);
    setNewSubtask("");
  };

  const removeSubtask = (itemId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const startEditingItem = (item: ChecklistItem) => {
    setEditingItemId(item.id);
    setEditingItemText(item.text);
  };

  const saveEditedItem = () => {
    if (!editingItemText.trim() || !editingItemId) {
      setEditingItemId(null);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItemId ? { ...item, text: editingItemText } : item
      )
    );
    setEditingItemId(null);
  };

  const handleEditTask = () => {
    setIsEditingTask(true);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
  };

  const handleSaveTask = () => {
    TaskManager.updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditingTask(false);
  };

  const handleCancelTask = () => {
    setIsEditingTask(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
  };

  const progress =
    items.length > 0
      ? (items.filter((item) => item.completed).length / items.length) * 100
      : 0;

  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-md p-4 border-l-4 transition-all ${
        task.completed ? "opacity-70 border-gray-800" : "border-gray-100"
      }`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            className={`w-5 h-5 rounded-md border ${
              task.completed ? "bg-blue-500 border-blue-500" : "border-gray-300"
            } flex items-center justify-center`}
            disabled={isEditingTask}
          >
            {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
          </Checkbox>
        </div>

        <div className="flex-1">
          {isEditingTask ? (
            <div className="space-y-2 mb-4">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-2 py-1 bg-gray-700 text-gray-100 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-2 py-1 bg-gray-700 text-gray-100 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Add description..."
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveTask}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelTask}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-300"
                        : "text-gray-100"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <ListBulletIcon className="w-4 h-4 ml-2 text-indigo-500" />
                </div>

                {DecoratedTask.hasReminder && (
                  <div className="text-amber-500 ml-2">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                )}
              </div>

              {task.description && (
                <p
                  className={`mt-1 text-sm ${
                    task.completed ? "text-gray-500" : "text-gray-300"
                  }`}
                >
                  {task.description}
                </p>
              )}
            </>
          )}

          <div className="mt-3 w-full bg-gray-600 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {items.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item.id} className="flex items-center group">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                    className={`w-4 h-4 mr-2 rounded border ${
                      item.completed
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    } flex items-center justify-center`}
                  >
                    {item.completed && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </Checkbox>

                  {editingItemId === item.id ? (
                    <div className="flex-1 flex items-center">
                      <input
                        type="text"
                        value={editingItemText}
                        onChange={(e) => setEditingItemText(e.target.value)}
                        className="flex-1 text-sm px-2 py-1 bg-gray-700 text-gray-100 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditedItem();
                          if (e.key === "Escape") setEditingItemId(null);
                        }}
                        autoFocus
                      />
                      <button
                        onClick={saveEditedItem}
                        className="ml-2 text-blue-500 hover:text-blue-400"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-sm flex-1 ${
                        item.completed
                          ? "line-through text-gray-500"
                          : "text-gray-300"
                      }`}
                    >
                      {item.text}
                    </span>
                  )}

                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingItemId !== item.id && (
                      <button
                        onClick={() => startEditingItem(item)}
                        className="text-gray-400 hover:text-blue-500 transition-colors mr-2"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => removeSubtask(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 text-center text-gray-400 text-sm py-2">
              No checklist items. Add your first item below.
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Add a subtask..."
              className="flex-1 text-sm px-3 py-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") addSubtask();
              }}
            />
            <button
              onClick={addSubtask}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isEditingTask && (
          <div className="flex items-center">
            <button
              onClick={handleEditTask}
              className="mr-2 p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onRemove}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <TaskObserver task={task} />
    </div>
  );
};
