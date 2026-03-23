import React from "react";
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { useAuthStore } from "../store/useAuthStore";
import { Plus, Trash2, LogOut } from "lucide-react";

const Dashboard = () => {
  const { tasks, fetchTasks, addTask, deleteTask, updateTask, isTasksLoading } =
    useTaskStore();
  const { authUser, logout } = useAuthStore();
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({ title: newTitle });
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-200 shadow-sm px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary">NPRU TaskFlow Mini</h1>
        </div>
        <div className="flex-none gap-4 items-center">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span>{authUser?.fullName?.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <span className="font-medium">{authUser?.fullName}</span>
          <button onClick={logout} className="btn btn-ghost btn-sm text-error">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <form
          onSubmit={handleAdd}
          className="flex gap-2 mb-10 bg-base-200 p-4 rounded-xl shadow"
        >
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Add a new task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={20} /> Add Task
          </button>
        </form>

        {isTasksLoading ? (
          <div className="flex justify-center p-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center p-20 bg-base-200 rounded-xl">
            <h3 className="text-xl font-medium text-base-content/60">
              No tasks yet. Add your first task!
            </h3>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="card bg-base-200 shadow p-5 flex-row items-center justify-between gap-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() =>
                      updateTask(task._id, {
                        status: task.status === "done" ? "todo" : "done",
                      })
                    }
                    className="checkbox checkbox-primary checkbox-md"
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-lg ${task.status === "done" ? "line-through opacity-50" : ""}`}
                    >
                      {task.title}
                    </span>
                    <span className="text-xs text-base-content/50">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="btn btn-ghost btn-circle text-error hover:bg-error/10"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
