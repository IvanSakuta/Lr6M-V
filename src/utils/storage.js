export function getCustomUsers() {
    const users = localStorage.getItem('customUsers');
    return users ? JSON.parse(users) : [];
}

export function saveCustomUsers(users) {
    localStorage.setItem('customUsers', JSON.stringify(users));
}

export function getCustomTodos() {
    const todos = localStorage.getItem('customTodos');
    return todos ? JSON.parse(todos) : [];
}

export function saveCustomTodos(todos) {
    localStorage.setItem('customTodos', JSON.stringify(todos));
}