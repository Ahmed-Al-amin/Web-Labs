/**
 * ----------------------------------------------------------------
 * MODEL
 * Manages the data, logic, and rules.
 * It's responsible for the 'tasks' array and localStorage.
 * ----------------------------------------------------------------
 */
class Task {
    constructor(text) {
        this.id = new Date().getTime(); // Simple unique ID
        this.text = text;
        this.completed = false;
        this.timestamp = new Date();
    }
}

class TaskManager { // This is our Model
    constructor() {
        // Load tasks from localStorage or use an empty array
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Bind the 'onTaskListChanged' event (from the Controller)
    bindTaskListChanged(callback) {
        this.onTaskListChanged = callback;
    }

    // Private method to update tasks and localStorage
    _commit(tasks) {
        this.onTaskListChanged(tasks); // Trigger the View render
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTask(taskText) {
        const newTask = new Task(taskText);
        this.tasks.push(newTask);
        this._commit(this.tasks);
    }

    editTask(id, updatedText) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, text: updatedText } : task
        );
        this._commit(this.tasks);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this._commit(this.tasks);
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this._commit(this.tasks);
    }
}

/**
 * ----------------------------------------------------------------
 * VIEW
 * Manages the UI and what the user sees.
 * It's only responsible for DOM manipulation.
 * ----------------------------------------------------------------
 */
class View {
    constructor() {
        // Get all DOM elements
        this.app = this._getElement('.container');
        this.form = this._getElement('#task-form');
        this.input = this._getElement('#task-input');
        this.taskList = this._getElement('#task-list');
        this.filterButtons = this._getElement('.filter-buttons');
        this.sortButtons = this._getElement('.sort-buttons');

        this._filter = 'all'; // Default filter
        this._sort = 'creation'; // Default sort
    }

    // Helper to get elements
    _getElement(selector) {
        return document.querySelector(selector);
    }

    // Get the text from the input
    get taskText() {
        const text = this.input.value;
        this.clearInput();
        return text;
    }

    clearInput() {
        this.input.value = '';
    }

    // Format the timestamp (as requested in "Enhancements")
    _formatTimestamp(date) {
        return new Date(date).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    // Display the tasks in the UI
    displayTasks(tasks) {
        // Clear the list first
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        // Apply filtering
        let filteredTasks = tasks;
        if (this._filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (this._filter === 'incomplete') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        // Apply sorting
        if (this._sort === 'alpha') {
            filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
        } else { // 'creation'
            filteredTasks.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }

        // Show a message if no tasks
        if (filteredTasks.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'No tasks to show. Add one!';
            p.style.textAlign = 'center';
            this.taskList.append(p);
            return;
        }

        // Create and append each task element
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.dataset.id = task.id;
            if (task.completed) {
                li.classList.add('completed');
            }

            // --- UI Upgrade: Use Icons (emojis) ---
            const toggleIcon = task.completed ? '↻' : '✔'; // Check or "un-check"

            li.innerHTML = `
                <button class="task-btn toggle-btn">${toggleIcon}</button>
                <div class="task-content">
                    <span class="task-text">${task.text}</span>
                    <span class="task-timestamp">${this._formatTimestamp(task.timestamp)}</span>
                </div>
                <button class="task-btn edit-btn">✏️</button>
                <button class="task-btn delete-btn">❌</button>
            `;
            
            // --- UI Upgrade: CSS Transition ---
            // Add a class to trigger the transition
// --- UI Upgrade: CSS Transition ---
            
            this.taskList.append(li); // 1. Add the item (it's invisible)
            
            // 2. NOW, add the "visible" class to trigger the animation
            requestAnimationFrame(() => {
                li.classList.add('task-item-visible');
            });
        });
    }

    // --- Bind Controller Actions to View Events ---
    
    bindAddTask(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const text = this.taskText;
            if (text) {
                handler(text);
            }
        });
    }

    // Use event delegation for task list actions
    bindTaskListEvents(handleToggle, handleDelete, handleEdit) {
        this.taskList.addEventListener('click', event => {
            const target = event.target;
            const li = target.closest('.task-item');
            if (!li) return; // Clicked outside a task item

            const id = parseInt(li.dataset.id);

            if (target.classList.contains('toggle-btn')) {
                handleToggle(id);
            } else if (target.classList.contains('delete-btn')) {
                // --- UI Upgrade: CSS Transition ---
                li.classList.add('task-item-exit');
                // Wait for animation to finish before deleting
                li.addEventListener('transitionend', () => {
                    handleDelete(id);
                });
            } else if (target.classList.contains('edit-btn')) {
                // --- Enhancement: Edit Task ---
                const taskTextElement = li.querySelector('.task-text');
                const newText = prompt('Edit your task:', taskTextElement.textContent);
                if (newText && newText.trim() !== '') {
                    handleEdit(id, newText.trim());
                }
            }
        });
    }
    
    bindFilterEvents(handler) {
        this.filterButtons.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                this._filter = event.target.dataset.filter;
                // Update active button
                this.filterButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                handler(); // Tell controller to re-render
            }
        });
    }
    
    bindSortEvents(handler) {
        this.sortButtons.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                this._sort = event.target.dataset.sort;
                // Update active button (if needed, or just re-render)
                this.sortButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('active')); // Simple "active" state
                event.target.classList.add('active');
                handler(); // Tell controller to re-render
            }
        });
    }
}

/**
 * ----------------------------------------------------------------
 * CONTROLLER
 * Binds the Model and View together.
 * It listens for user actions (from View) and updates the Model.
 * It listens for data changes (from Model) and updates the View.
 * ----------------------------------------------------------------
 */
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // --- Bind Model Changes to View ---
        // When the model's task list changes, the view will re-display
        this.model.bindTaskListChanged(this.onTaskListChanged);

        // --- Bind View Events to Controller Handlers ---
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindTaskListEvents(this.handleToggleTask, this.handleDeleteTask, this.handleEditTask);
        this.view.bindFilterEvents(this.handleRender);
        this.view.bindSortEvents(this.handleRender);

        // Initial display of tasks
        this.onTaskListChanged(this.model.tasks);
    }

    // Handler to be called when the model's data changes
    onTaskListChanged = (tasks) => {
        this.view.displayTasks(tasks);
    }
    
    // Handler to re-render (for filters/sorts)
    handleRender = () => {
        this.view.displayTasks(this.model.tasks);
    }

    // --- Action Handlers ---
    
    handleAddTask = (taskText) => {
        this.model.addTask(taskText);
    }

    handleEditTask = (id, newText) => {
        this.model.editTask(id, newText);
    }

    handleDeleteTask = (id) => {
        this.model.deleteTask(id);
    }

    handleToggleTask = (id) => {
        this.model.toggleTask(id);
    }
}

// --- Initialize the App ---
const app = new Controller(new TaskManager(), new View());