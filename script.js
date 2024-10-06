// script.js

// Add event listener to the Add Task button
document.getElementById('addTaskButton').addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const newTask = document.createElement('li');
        
        newTask.innerHTML = `
            <span>${taskText}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;

        taskList.appendChild(newTask);
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

// Function to remove a task
function removeTask(taskButton) {
    const taskItem = taskButton.parentElement;
    taskItem.remove();
}
