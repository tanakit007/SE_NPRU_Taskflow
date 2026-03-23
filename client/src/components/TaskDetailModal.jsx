import { useState, useEffect } from "react";
import { useTaskStore } from "../store/useTaskStore";

const TaskDetailModal = ({ task, onClose }) => {
  const { updateTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "normal",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task._id, formData);
    onClose();
  };

  if (!task) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Task Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
              placeholder="Description"
            ></textarea>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailModal;
