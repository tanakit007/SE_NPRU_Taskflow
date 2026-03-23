import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isTasksLoading: false,

  fetchTasks: async () => {
    set({ isTasksLoading: true });
    try {
      const res = await axiosInstance.get("/tasks");
      set({ tasks: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isTasksLoading: false });
    }
  },

  addTask: async (data) => {
    try {
      const res = await axiosInstance.post("/tasks", data);
      set({ tasks: [...get().tasks, res.data] });
      toast.success("Task created!");
    } catch (error) {
      toast.error("Failed to create task");
    }
  },

  updateTask: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, data);
      set({
        tasks: get().tasks.map((t) => (t._id === id ? res.data : t)),
      });
      toast.success("Task updated");
    } catch (error) {
      toast.error("Update failed");
    }
  },

  deleteTask: async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      set({ tasks: get().tasks.filter((t) => t._id !== id) });
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  },
}));
