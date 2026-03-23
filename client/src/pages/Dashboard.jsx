import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { Plus, Trash2 } from "lucide-react";
import TaskDetailModal from "../components/TaskDetailModal";

const Dashboard = () => {
  const { tasks, fetchTasks, addTask, deleteTask, updateTask, isTasksLoading } =
    useTaskStore();
  const [newTitle, setNewTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);

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
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">SE NPRU TaskFlow Mini</h1>

        <form onSubmit={handleAdd} className="flex gap-2 mb-8">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={20} /> Add
          </button>
        </form>

        {isTasksLoading ? (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="card bg-base-200 shadow-sm p-4 flex-row items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() =>
                      updateTask(task._id, {
                        status: task.status === "done" ? "todo" : "done",
                      })
                    }
                    className="checkbox checkbox-primary"
                  />
                  <span
                    className={`cursor-pointer hover:text-primary ${
                      task.status === "done" ? "line-through opacity-50" : ""
                    }`}
                    onClick={() => setEditingTask(task)}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="btn btn-ghost btn-sm text-error"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <TaskDetailModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </>
  );
};
export default Dashboard;
