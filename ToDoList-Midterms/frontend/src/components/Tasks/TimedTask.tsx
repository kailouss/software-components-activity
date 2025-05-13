import type React from "react";
import { useState } from "react";
import type { Task } from "../../types/Task";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  TrashIcon,
  ClockIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { TaskDecorator } from "../decorators/TaskDecorator";
import { TaskObserver } from "../../observers/TaskObserver";
import { TaskManager } from "../../services/TaskManager";

interface TimedTaskProps {
  task: Task;
  onToggleComplete: () => void;
  onRemove: () => void;
}

export const TimedTask: React.FC<TimedTaskProps> = ({
  task,
  onToggleComplete,
  onRemove,
}) => {
  const DecoratedTask = task.dueDate ? TaskDecorator.withReminder(task) : task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setEditedDueDate(task.dueDate || "");
  };

  const handleSave = () => {
    TaskManager.updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setEditedDueDate(task.dueDate || "");
  };

  return (
    <div
      className={`flex justify-between items-center p-4 border-l-4 transition-all border rounded shadow-sm bg-gray-800 relative ${
        task.completed
          ? "border-gray-800"
          : isOverdue
          ? "border-l-4 border-red-500"
          : "border-gray-100"
      }`}
    >
      <div className="flex items-start w-full">
        <div className="mr-3 mt-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            className={`w-5 h-5 rounded-md border ${
              task.completed
                ? "bg-indigo-600 border-indigo-600"
                : "border-gray-300"
            } flex items-center justify-center`}
            disabled={isEditing}
          >
            {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
          </Checkbox>
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
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
              <input
                type="datetime-local"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className="w-full px-2 py-1 bg-gray-700 text-gray-100 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <h3
                  className={`font-medium ${
                    task.completed
                      ? "line-through text-gray-300"
                      : "text-gray-100"
                  }`}
                >
                  {task.title}
                </h3>
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

              <div className="mt-2 w-full flex items-center text-sm">
                <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
                <span
                  className={`${
                    isOverdue ? "text-red-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {formatDueDate(task.dueDate)}
                </span>

                {isOverdue && (
                  <div className="ml-2 flex self-end text-red-600">
                    <TaskObserver task={task} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex flex-row items-center">
            {DecoratedTask.hasReminder && (
              <div className="text-gray-400 ml-2">
                <ClockIcon className="w-5 h-5" />
              </div>
            )}
            <button
              onClick={handleEdit}
              className="ml-2 p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onRemove}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
