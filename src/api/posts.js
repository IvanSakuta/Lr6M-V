export async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки постов:', error);
        return [];
    }
}