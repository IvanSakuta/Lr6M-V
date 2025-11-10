export function getCustomUsers() {
    const users = localStorage.getItem('customUsers');
    return users ? JSON.parse(users) : [];
}

export function saveCustomUsers(users) {
    localStorage.setItem('customUsers', JSON.stringify(users));
}