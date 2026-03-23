import React from "react";
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";
import { Plus, Trash2 } from "lucide-react";

const Dashboard = () => {
  const { tasks, fetchTasks, addTask, deleteTask, updateTask, isTasksLoading } =
    useTaskStore();
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    addTask(formData);
    setFormData({ title: "", description: "", priority: "normal" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 dark:from-gray-950 dark:via-emerald-950 dark:to-amber-950">
      {/* Navbar */}
      <div className="navbar bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg px-6 border-b border-emerald-200 dark:border-emerald-800">
        <div className="flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
            NPRU TaskFlow Mini
          </h1>
        </div>
        <div className="flex-none gap-3 items-center">
          <div className="avatar placeholder ring-2 ring-emerald-200 dark:ring-emerald-800">
            <div className="bg-gradient-to-br from-emerald-500 to-amber-500 text-white rounded-full w-10 text-sm font-bold">
              {authUser?.fullName?.charAt(0).toUpperCase()}
            </div>
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300 hidden md:block">
            {authUser?.fullName}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-10 animate-fade-in">
        {/* Add Task Form */}
        <form
          onSubmit={handleAdd}
          className="mb-10 bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-emerald-950/50 dark:to-amber-950/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-2xl transition-all"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent mb-6">
            📝 Create New Task
          </h2>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-emerald-700 dark:text-emerald-300">
                  Task Title
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white/70 dark:bg-gray-800/60 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all rounded-lg"
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-emerald-700 dark:text-emerald-300">
                  Description
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full bg-white/70 dark:bg-gray-800/60 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all rounded-lg resize-none"
                placeholder="Add more details about this task..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-emerald-700 dark:text-emerald-300">
                  Priority
                </span>
              </label>
              <select
                className="select select-bordered w-full bg-white/70 dark:bg-gray-800/60 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all rounded-lg"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white border-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 rounded-lg font-semibold"
            >
              <Plus size={20} /> <span>Create Task</span>
            </button>
          </div>
        </form>

        {isTasksLoading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg bg-gradient-to-r from-emerald-500 to-amber-500"></span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center p-12 bg-gradient-to-br from-emerald-50 to-amber-50 dark:from-emerald-950/50 dark:to-amber-950/50 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-200 dark:border-emerald-800 animate-scale-in">
            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
              No tasks yet!
            </h3>
            <p className="text-emerald-600 dark:text-emerald-400">
              Add your first task above to get started 🚀
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task, index) => (
              <div
                key={task._id}
                className="card bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg hover:shadow-2xl border border-emerald-200 dark:border-emerald-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={task.status === "done"}
                      onChange={() =>
                        updateTask(task._id, {
                          status: task.status === "done" ? "todo" : "done",
                        })
                      }
                      className="checkbox checkbox-primary checkbox-md mt-2 [&:checked]:bg-gradient-to-r [&:checked]:from-emerald-500 [&:checked]:to-amber-500 transition-all"
                    />
                    <div className="flex-1">
                      <span
                        className={`text-xl font-semibold transition-all block mb-1 ${
                          task.status === "done"
                            ? "line-through opacity-50 text-gray-400 dark:text-gray-500"
                            : "text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.description && (
                        <p
                          className={`text-sm mb-2 ${
                            task.status === "done"
                              ? "opacity-50 text-gray-400 dark:text-gray-500"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Created:{" "}
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        {task.priority && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : task.priority === "low"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="btn btn-ghost btn-sm btn-circle text-error hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 transition-all duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
