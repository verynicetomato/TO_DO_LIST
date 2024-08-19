document.getElementById('add-btn').addEventListener('click', function() {
    addTodo();
});

document.getElementById('todo-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        const todoList = document.getElementById('todo-list');

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="todo-text">${todoText}</span>
            <button onclick="deleteTodoItem(this)">
                <img src="images/trash.jpg" alt="Delete"> <!-- 이미지 경로 설정 -->
            </button>
        `;
        
        // 클릭 시 취소선을 추가하는 이벤트 리스너
        listItem.addEventListener('click', function(event) {
            if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'IMG') {
                const todoTextElement = this.querySelector('.todo-text');
                todoTextElement.classList.toggle('completed');
            }
        });

        todoList.appendChild(listItem);
        todoInput.value = "";
    }
}

function deleteTodoItem(button) {
    const listItem = button.parentNode;
    listItem.remove();
}
