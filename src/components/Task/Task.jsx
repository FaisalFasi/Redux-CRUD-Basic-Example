import React from "react";

import styles from "./Task.module.css";
const Task = ({ task, deleteTask, editTask }) => {
  return (
    <div className={styles.container}>
      <h2>{task.title}</h2>
      <p>{task.desc}</p>
      <div className={styles.btnsContainer}>
        <button onClick={() => deleteTask(task.id)}>❌</button>
        <button onClick={() => editTask(task.id)}>📝</button>
      </div>
    </div>
  );
};

export default Task;
