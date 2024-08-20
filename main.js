document.addEventListener('DOMContentLoaded', function() {
    showCurrentDate();
});

document.getElementById('add-btn').addEventListener('click', addTodo);

document.getElementById('todo-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function showCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('ko-KR', options);
    
    dateElement.textContent = formattedDate;
}

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const todoList = document.getElementById('todo-list');
        const listItem = createTodoItem(todoText);

        todoList.appendChild(listItem);
        todoInput.value = "";
    }
}

function createTodoItem(text) {
    const listItem = document.createElement('li');
    
    listItem.innerHTML = `
        <img src="images/check_circle.png" class="check-circle" alt="Complete">
        <span class="todo-text">${text}</span>
        <div class="icon-container">
            <button class="edit-btn">
                <img src="images/edit.png" alt="Edit">
            </button>
            <button class="delete-btn">
                <img src="images/delete.png" alt="Delete">
            </button>
        </div>
    `;

    listItem.querySelector('.check-circle').addEventListener('click', function() {
        listItem.classList.toggle('completed');
    });

    listItem.querySelector('.delete-btn').addEventListener('click', function() {
        listItem.remove();
    });

    listItem.querySelector('.edit-btn').addEventListener('click', function() {
        startEdit(listItem);
    });

    return listItem;
}
function startEdit(listItem) {
    const todoText = listItem.querySelector('.todo-text').textContent;
    
    listItem.innerHTML = `
        <input type="text" class="edit-input" value="${todoText}">
        <div class="icon-container">
            <button class="check-btn">
                <img src="images/check.png" alt="Confirm">
            </button>
            <button class="close-btn">
                <img src="images/close.png" alt="Cancel">
            </button>
        </div>
    `;

    listItem.querySelector('.check-btn').addEventListener('click', function() {
        const newText = listItem.querySelector('.edit-input').value;
        const updatedItem = createTodoItem(newText);
        listItem.replaceWith(updatedItem);
    });

    listItem.querySelector('.close-btn').addEventListener('click', function() {
        const originalItem = createTodoItem(todoText);
        listItem.replaceWith(originalItem);
    });
}