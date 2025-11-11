import { createElement } from '../utils/dom.js';
import { createSearch } from '../components/search.js';
import { createBreadcrumbs } from '../components/breadcrumbs.js';
import { showCommentsList } from '../components/lists.js';
import { getComments } from '../api/comments.js';

export async function showCommentsPage(app) {
    app.appendChild(createBreadcrumbs());
    app.appendChild(createElement('h1', 'Комментарии'));
    
    const search = createSearch('Поиск по имени или тексту комментария...', (e) => {
        searchComments(e.target.value, app);
    });
    app.appendChild(search);
    
    await displayComments(app);
}

async function displayComments(app) {
    const loading = createElement('p', 'Загрузка комментариев...');
    app.appendChild(loading);
    
    const apiComments = await getComments();
    window.currentComments = apiComments;
    
    loading.remove();
    showCommentsListComponent(apiComments, app);
}

function showCommentsListComponent(comments, app) {
    const oldList = document.querySelector('.list');
    const oldCount = document.querySelector('.count-info');
    if (oldList) oldList.remove();
    if (oldCount) oldCount.remove();
    
    const countInfo = createElement('p', `Найдено комментариев: ${comments.length}`, 'count-info');
    app.appendChild(countInfo);
    
    const list = showCommentsList(comments);
    app.appendChild(list);
}

function searchComments(searchTerm, app) {
    if (!window.currentComments) return;
    
    const filteredComments = window.currentComments.filter(comment =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    showCommentsListComponent(filteredComments, app);
}