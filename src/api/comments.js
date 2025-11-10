export async function getComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error);
        return [];
    }
}