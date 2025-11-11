import { createElement } from '../utils/dom.js';
import { createSearch } from '../components/search.js';
import { createBreadcrumbs } from '../components/breadcrumbs.js';
import { showTodosList } from '../components/lists.js';
import { getTodos } from '../api/todos.js';
import { getCustomTodos, saveCustomTodos } from '../utils/storage.js';

export async function showTodosPage(app) {
    app.appendChild(createBreadcrumbs());
    app.appendChild(createElement('h1', 'Список задач'));
    
    const search = createSearch('Поиск по названию задачи...', (e) => {
        searchTodos(e.target.value, app);
    });
    app.appendChild(search);
    
    await displayTodos(app);
}

async function displayTodos(app) {
    const loading = createElement('p', 'Загрузка задач...');
    app.appendChild(loading);
    
    const apiTodos = await getTodos();
    const customTodos = getCustomTodos();
    const allTodos = [...apiTodos, ...customTodos];
    window.currentTodos = allTodos;
    
    loading.remove();
    showTodosListComponent(allTodos, app);
}

function showTodosListComponent(todos, app) {
    const oldList = document.querySelector('.list');
    const oldCount = document.querySelector('.count-info');
    if (oldList) oldList.remove();
    if (oldCount) oldCount.remove();
    
    const countInfo = createElement('p', `Найдено задач: ${todos.length}`, 'count-info');
    app.appendChild(countInfo);
    
    const list = showTodosList(
        todos,
        (todoId) => deleteTodo(todoId, app)
    );
    
    app.appendChild(list);
}

function searchTodos(searchTerm, app) {
    if (!window.currentTodos) return;
    
    const filteredTodos = window.currentTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    showTodosListComponent(filteredTodos, app);
}

function deleteTodo(todoId, app) {
    if (confirm('Удалить эту задачу?')) {
        const customTodos = getCustomTodos();
        const updatedTodos = customTodos.filter(todo => todo.id !== todoId);
        saveCustomTodos(updatedTodos);
        
        const currentTodos = window.currentTodos.filter(todo => todo.id !== todoId);
        window.currentTodos = currentTodos;
        
        showTodosListComponent(currentTodos, app);
    }
}