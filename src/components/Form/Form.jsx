import React, { useState } from "react";
import Task from "../Task/Task";
import { useSelector, useDispatch } from "react-redux";
import {
  handleSubmit,
  deleteTask,
  updateTask,
} from "../../features/Todo/todoSlice";
import styles from "./Form.module.css";

const Form = () => {
  const taskList = useSelector((state) => state.todo.taskList);
  const dispatch = useDispatch();

  const generateId = () => {
    return Math.floor(Math.random() * 1e9);
  };

  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState("");

  const handleSubmitFunc = (e) => {
    e.preventDefault();

    const newTask = { title, desc, id: generateId() };
    dispatch(handleSubmit(newTask));
    setTitle("");
    setDesc("");
  };

  const deleteTaskFunc = (id) => {
    dispatch(deleteTask(id));
    setTitle("");
    setDesc("");
    setIsUpdating(false);
  };
  const editTask = (id) => {
    setUpdatingTaskId(id);
    const task = taskList.find((task) => task.id === id);
    setIsUpdating(true);
    setTitle(task.title);
    setDesc(task.desc);
  };

  const updateTaskFunc = () => {
    const updateTaskData = { id: updatingTaskId, title, desc };
    console.log(updateTaskData);
    dispatch(updateTask(updateTaskData));
    setTitle("");
    setDesc("");
    setIsUpdating(false);
  };

  return (
    <div className={styles.container}>
      <form action="submit" className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="">Title</label>

          <input
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="">Description</label>

          <input
            type="text"
            value={desc}
            placeholder="Enter description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        {!isUpdating && (
          <button type="submit" onClick={handleSubmitFunc}>
            Submit
          </button>
        )}
        {isUpdating && (
          <button type="button" onClick={updateTaskFunc}>
            Update
          </button>
        )}
      </form>
      <div className={styles.itemsList}>
        {taskList.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTaskFunc}
              updateTask={updateTaskFunc}
              editTask={editTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Form;
