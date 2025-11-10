import { createElement, createLink } from '../utils/dom.js';
import { createSearch } from '../components/search.js';
import { createAddUserForm } from '../components/forms.js';
import { createBreadcrumbs } from '../components/breadcrumbs.js';
import { showUsersList } from '../components/lists.js';
import { getUsers } from '../api/users.js';
import { getCustomUsers, saveCustomUsers } from '../utils/storage.js';

export async function showUsersPage(app) {
    app.appendChild(createBreadcrumbs());
    app.appendChild(createElement('h1', 'Пользователи'));
    
    const nav = createElement('div', '', 'navigation');
    nav.appendChild(createElement('p', 'Перейти к:'));
    nav.appendChild(createLink('Списку задач', '#users#todos'));
    app.appendChild(nav);
    
    app.appendChild(createAddUserForm(() => displayUsers(app)));
    
    const search = createSearch('Поиск по имени или email...', (e) => {
        searchUsers(e.target.value, app);
    });
    app.appendChild(search);
    
    await displayUsers(app);
}

async function displayUsers(app) {
    const loading = createElement('p', 'Загрузка...');
    app.appendChild(loading);
    
    const apiUsers = await getUsers();
    const customUsers = getCustomUsers();
    const allUsers = [...apiUsers, ...customUsers];
    
    loading.remove();
    
    window.currentUsers = allUsers;
    showUsersListComponent(allUsers, app);
}

function showUsersListComponent(users, app) {
    const oldList = document.querySelector('.list');
    const oldCount = document.querySelector('.count-info');
    if (oldList) oldList.remove();
    if (oldCount) oldCount.remove();
    
    const countInfo = createElement('p', `Найдено пользователей: ${users.length}`, 'count-info');
    app.appendChild(countInfo);
    
    const list = showUsersList(
        users,
        (userId) => deleteUser(userId, app),
        (userId, userName) => showTodoForm(userId, userName, app)
    );
    
    app.appendChild(list);
}

function searchUsers(searchTerm, app) {
    if (!window.currentUsers) return;
    
    const filteredUsers = window.currentUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    showUsersListComponent(filteredUsers, app);
}

function deleteUser(userId, app) {
    if (confirm('Удалить этого пользователя?')) {
        const customUsers = getCustomUsers();
        const updatedUsers = customUsers.filter(user => user.id !== userId);
        saveCustomUsers(updatedUsers);
        
        const currentUsers = window.currentUsers.filter(user => user.id !== userId);
        window.currentUsers = currentUsers;
        
        showUsersListComponent(currentUsers, app);
    }
}

function showTodoForm(userId, userName, app) {
    const existingForm = document.querySelector('.add-form');
    if (existingForm) existingForm.remove();
    
    alert(`Добавление задачи для пользователя: ${userName}`);
}