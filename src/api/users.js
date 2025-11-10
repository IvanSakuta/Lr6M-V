export async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
        return [];
    }
}