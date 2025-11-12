import { createElement, createButton } from '../utils/dom.js';

export function showUsersList(users, onUserDeleted, onTodoFormRequested) {
    const list = createElement('div', '', 'list');
    
    if (users.length === 0) {
        list.appendChild(createElement('p', 'Пользователи не найдены'));
        return list;
    }
    
    users.forEach(user => {
        const item = createElement('div', '', 'item user-item');
        item.appendChild(createElement('h3', user.name));
        item.appendChild(createElement('p', `Email: ${user.email}`));
        item.appendChild(createElement('p', `Телефон: ${user.phone}`));
        
        const actions = createElement('div', '', 'user-actions');
        
        const addTodoBtn = createButton('Добавить задачу', () => {
            onTodoFormRequested(user.id, user.name);
        }, 'action-btn');
        
        actions.appendChild(addTodoBtn);
        
        if (user.id > 10) {
            const deleteBtn = createButton('Удалить', () => onUserDeleted(user.id), 'delete-btn');
            actions.appendChild(deleteBtn);
        }
        
        item.appendChild(actions);
        list.appendChild(item);
    });
    
    return list;
}

export function showTodosList(todos, onTodoDeleted) {
    const list = createElement('div', '', 'list');
    
    if (todos.length === 0) {
        list.appendChild(createElement('p', 'Задачи не найдены'));
        return list;
    }
    
    todos.forEach(todo => {
        const item = createElement('div', '', 'item todo-item');
        item.appendChild(createElement('h3', todo.title));
        item.appendChild(createElement('p', `Статус: ${todo.completed ? 'Выполнено' : 'Не выполнено'}`));
        
        if (todo.id > 200) {
            const deleteBtn = createButton('Удалить', () => onTodoDeleted(todo.id), 'delete-btn');
            item.appendChild(deleteBtn);
        }
        
        list.appendChild(item);
    });
    
    return list;
}

export function showPostsList(posts, onPostDeleted) {
    const list = createElement('div', '', 'list');
    
    if (posts.length === 0) {
        list.appendChild(createElement('p', 'Посты не найдены'));
        return list;
    }
    
    posts.forEach(post => {
        const item = createElement('div', '', 'item post-item');
        item.appendChild(createElement('h3', post.title));
        item.appendChild(createElement('p', post.body));
        
        list.appendChild(item);
    });
    
    return list;
}

export function showCommentsList(comments) {
    const list = createElement('div', '', 'list');
    
    if (comments.length === 0) {
        list.appendChild(createElement('p', 'Комментарии не найдены'));
        return list;
    }
    
    comments.forEach(comment => {
        const item = createElement('div', '', 'item comment-item');
        item.appendChild(createElement('h3', comment.name));
        item.appendChild(createElement('p', `Email: ${comment.email}`));
        item.appendChild(createElement('p', comment.body));
        
        list.appendChild(item);
    });
    
    return list;
}