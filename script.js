// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Load current or completed tasks based on the page
    if (document.getElementById('taskList')) {
        loadTasks('current');
    } else if (document.getElementById('completedTaskList')) {
        loadTasks('completed');
    }

    const addTaskButton = document.getElementById('addTaskButton');
    if (addTaskButton) {
        addTaskButton.addEventListener('click', addTask);
    }
});

// Function to load tasks from localStorage
function loadTasks(taskType) {
    const taskListElement = taskType === 'current' ? document.getElementById('taskList') : document.getElementById('completedTaskList');
    let tasks = JSON.parse(localStorage.getItem(taskType)) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, taskListElement, taskType);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        createTaskElement(taskText, document.getElementById('taskList'), 'current');
        saveTask(taskText, 'current');
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

// Function to create a new task element
function createTaskElement(taskText, listElement, taskType) {
    const newTask = document.createElement('li');

    newTask.innerHTML = `
        <span contenteditable="false">${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="completeTask(this, '${taskType}')">Complete</button>
        <button onclick="removeTask(this, '${taskType}')">Delete</button>
    `;

    listElement.appendChild(newTask);
}

// Function to save a task to localStorage
function saveTask(taskText, taskType) {
    let tasks = JSON.parse(localStorage.getItem(taskType)) || [];
    tasks.push({ text: taskText });
    localStorage.setItem(taskType, JSON.stringify(tasks));
}

// Function to remove a task
function removeTask(taskButton, taskType) {
    const taskItem = taskButton.parentElement;
    taskItem.remove();

    updateLocalStorage(taskItem.querySelector('span').textContent, taskType);
}

// Function to mark a task as completed
function completeTask(taskButton, currentType) {
    const taskItem = taskButton.parentElement;
    const taskText = taskItem.querySelector('span').textContent;

    // Remove from current tasks and add to completed tasks
    updateLocalStorage(taskText, currentType);
    saveTask(taskText, 'completed');

    taskItem.remove();
}

// Function to edit a task
function editTask(editButton) {
    const taskItem = editButton.parentElement;
    const taskSpan = taskItem.querySelector('span');

    if (editButton.textContent === 'Edit') {
        taskSpan.contentEditable = true;
        taskSpan.focus();
        editButton.textContent = 'Save';
    } else {
        taskSpan.contentEditable = false;
        updateLocalStorage(taskSpan.textContent, 'current', true);
        editButton.textContent = 'Edit';
    }
}

// Function to update localStorage when a task is removed or edited
function updateLocalStorage(taskText, taskType, isEdit = false) {
    let tasks = JSON.parse(localStorage.getItem(taskType)) || [];

    if (isEdit) {
        tasks = tasks.map(task => (task.text === taskText ? { text: taskText } : task));
    } else {
        tasks = tasks.filter(task => task.text !== taskText);
    }

    localStorage.setItem(taskType, JSON.stringify(tasks));
}
