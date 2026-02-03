let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
    updateStats();
    
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
});

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (!text) {
        input.style.borderColor = '#ff6b6b';
        setTimeout(() => input.style.borderColor = '#e1e8ed', 500);
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleDateString('fr-FR')
    };
    
    tasks.unshift(newTask);
    input.value = '';
    saveTasks();
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function deleteTask(id) {
    if (confirm('🗑️ Supprimer "' + tasks.find(t => t.id === id)?.text + '" ?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTasks();
    updateStats();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    let tasksToShow = tasks;
    
    if (currentFilter === 'active') tasksToShow = tasks.filter(t => !t.completed);
    else if (currentFilter === 'completed') tasksToShow = tasks.filter(t => t.completed);
    
    taskList.innerHTML = tasksToShow.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" 
             onclick="if(event.target.tagName !== 'BUTTON') toggleTask(${task.id})">
            <input type="checkbox" class="task-checkbox" 
                   ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <div class="task-text">
                ${task.text}
                <div class="task-date">${task.createdAt}</div>
            </div>
            <button class="btn btn-danger" onclick="deleteTask(${task.id}); event.stopPropagation()" style="padding: 10px 15px; font-size: 14px;">
                🗑️
            </button>
        </div>
    `).join('');
}

function updateStats() {
    const active = tasks.filter(t => !t.completed).length;
    const total = tasks.length;
    document.getElementById('taskStats').innerHTML = 
        `📊 ${active} tâche${active > 1 ? 's' : ''} restante(s) sur ${total}`;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
