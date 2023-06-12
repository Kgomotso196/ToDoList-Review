/* eslint-disable*/
import _ from 'lodash';/* eslint-disable*/
import './style.css';
import { Functionality } from './modules/functionality.js';

const taskContainer = document.getElementById('first-section');
const submitButton = document.getElementById('for-button');
const clearAllDone = document.getElementById('clear-all');
let editButtonStats = false;
window.onload = function windowReady() {
  Functionality.displayTask();
  submitButton.onclick = function () {
    Functionality.newTask();
  };

  taskContainer.addEventListener('click', (e) => {
    if (e.target !== null && e.target !== 'NaN' && e.target !== '') {
      if (e.target.className === 'checkbox-class') {
        const taskIds = e.target.id.replace('checkbox-', '');
        const taskDescription = document.getElementById(`d${taskIds}`);
        const taskData = Functionality.getAllTasks();
        const index = parseInt(taskIds - 1, 10);
        if (taskData !== []) {
          if (taskData[index].completed) {
            taskData[index].completed = false;
            taskDescription.style.textDecoration = 'none';
          } else {
            taskData[index].completed = true;
            taskDescription.style.textDecoration = 'line-through';
          }
          Functionality.updateTask(taskData);
        }
      }
    }
  });

  taskContainer.addEventListener('click', (e) => {
    if (e.target !== null && e.target !== 'NaN' && e.target !== '') {
      if (e.target.className === 'editButton') {
        const taskIds = e.target.id.replace('editBttn-', '');
        const taskDescription = document.getElementById(`d${taskIds}`);
        const taskData = Functionality.getAllTasks();
        const index = parseInt(taskIds, 10);
        const editInput = document.getElementById(`edit-${taskIds}`);
        taskDescription.style.display = 'none';
        editInput.style.display = 'block';
        if (editButtonStats !== false) {
          taskData[index - 1].taskDescription = editInput.value;
          taskDescription.style.display = 'block';
          editInput.style.display = 'none';
          Functionality.updateTask(taskData);
          Functionality.displayTask();
          editButtonStats = false;
        } else {
          editButtonStats = true;
        }
      }
    }
  });

  Functionality.displayTask();
  taskContainer.addEventListener('click', (e) => {
    if (e.target !== null && e.target !== 'NaN' && e.target !== '') {
      if (e.target.className === 'deleteButton') {
        const taskIds = e.target.id.replace('delete-', '');
        const taskData = Functionality.getAllTasks();
        const index = parseInt(taskIds, 10);
        if (taskData !== []) {
          Functionality.removeTask(index - 1);
        }
      }
    }
  });

  clearAllDone.addEventListener('click', (e) => {
    const taskData = Functionality.getAllTasks();
    const storage = taskData.filter((todo) => todo.completed === false);
    for (let i = 0; i < storage.length; i++) {
      storage[i].index = i + 1;
    }
    Functionality.updateTask(storage);
    Functionality.displayTask();
  });
};
