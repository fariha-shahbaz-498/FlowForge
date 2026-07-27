import { useState } from "react";
import initialTasks from "../data/tasks";

function useTasks() {

  const [tasks, setTasks] = useState(initialTasks);


  // Add Task
  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...task,
      },
    ]);
  };


  // Delete Task
  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };


  // Update Task
  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task
      )
    );
  };


  // Change Status
  const changeStatus = (id, status) => {

    setTasks(
      tasks.map((task)=>
        task.id === id
        ? {...task,status}
        : task
      )
    );

  };


  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    changeStatus,
  };
}


export default useTasks;