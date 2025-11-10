export async function getTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки задач:', error);
        return [];
    }
}