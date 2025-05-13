import { useTasks } from "./hooks/useTasks";
import { useTaskForm } from "./hooks/useTaskForm";
import { useTaskSorting } from "./hooks/useTaskSorting";
import { TaskFactory } from "./components/TaskFactory";
import { FaCircle } from "react-icons/fa";

function App() {
  const { tasks, loading, addTask, removeTask, toggleTaskCompletion } =
    useTasks();
  const { sortStrategy, setSortStrategy, sortedTasks } = useTaskSorting(tasks);
  const {
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    newTaskType,
    setNewTaskType,
    newTaskDueDate,
    setNewTaskDueDate,
    handleAddTask,
  } = useTaskForm(addTask);

  return (
    <div className="h-screen w-full bg-black overflow-hidden font-in">
      <div className="flex-row h-full pt-6 items-center flex">
        <div className="border min-h-full max-h-full h-auto m-4 p-4 w-2/3 flex justify-evenly flex-col rounded-lg bg-gray-800 border-gray-600">
          <h1 className="text-white text-8xl mb-4 flex self-center">
            To-Do List
          </h1>
          <div className="flex flex-col h-2/3 justify-around">
            <div className="flex flex-col w-full items-center min-h-2/3 mb-4 gap-4 flex-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
                className="bg-gray-900 text-white text-center h-10 w-2/3 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Enter task description (optional)"
                rows={2}
                className="w-2/3 h-52 p-2 border text-gray-300 bg-gray-900 border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            <div className="flex flex-col items-center self-end w-full gap-4 flex-1">
              <select
                value={newTaskType}
                onChange={(e) =>
                  setNewTaskType(
                    e.target.value as "basic" | "timed" | "checklist"
                  )
                }
                className="bg-gray-700 text-white text-center h-10 w-1/3 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">
                  <FaCircle size={20} className="bg-white" />
                  Basic Task
                </option>
                <option value="timed">Timed Task</option>
                <option value="checklist">Checklist Task</option>
              </select>

              {newTaskType === "timed" && (
                <input
                  type="datetime-local"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="bg-gray-700 text-white text-center h-10 w-1/3 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row min-h-2/3 max-h-full h-auto w-2/3 gap-4">
          <div className="border min-h-1/3 h-auto p-4 border-gray-600 w-full flex flex-col rounded-lg bg-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-white">Sort by: </label>
              <select
                value={sortStrategy}
                onChange={(e) =>
                  setSortStrategy(e.target.value as "date" | "name" | "id")
                }
                className="bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="id">Creation Time</option>
                <option value="name">Name</option>
                <option value="date">Due Date</option>
              </select>
            </div>

            {loading ? (
              <p className="text-white">Loading tasks...</p>
            ) : (
              <div className="border border-gray-600 h-auto overflow-auto  rounded-lg bg-gray-900 p-4">
                {sortedTasks.length === 0 ? (
                  <p className="text-white text-center py-4">
                    No tasks yet. Add some tasks to get started!
                  </p>
                ) : (
                  sortedTasks.map((task) => (
                    <div key={task.id} className="mb-2 last:mb-0">
                      <TaskFactory
                        task={task}
                        onToggleComplete={() => toggleTaskCompletion(task.id)}
                        onRemove={() => removeTask(task.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
