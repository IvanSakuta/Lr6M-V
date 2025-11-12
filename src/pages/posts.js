import { createElement, createLink } from '../utils/dom.js';
import { createSearch } from '../components/search.js';
import { createBreadcrumbs } from '../components/breadcrumbs.js';
import { showPostsList } from '../components/lists.js';
import { getPosts } from '../api/posts.js';

export async function showPostsPage(app) {
    app.appendChild(createBreadcrumbs());
    app.appendChild(createElement('h1', 'Посты'));
    
    const nav = createElement('div', '', 'navigation');
    nav.appendChild(createElement('p', 'Перейти к:'));
    nav.appendChild(createLink('Комментариям', '#users#posts#comments'));
    app.appendChild(nav);
    
    const search = createSearch('Поиск по заголовку или тексту...', (e) => {
        searchPosts(e.target.value, app);
    });
    app.appendChild(search);
    
    await displayPosts(app);
}

async function displayPosts(app) {
    const loading = createElement('p', 'Загрузка постов...');
    app.appendChild(loading);
    
    const apiPosts = await getPosts();
    window.currentPosts = apiPosts;
    
    loading.remove();
    showPostsListComponent(apiPosts, app);
}

function showPostsListComponent(posts, app) {
    const oldList = document.querySelector('.list');
    const oldCount = document.querySelector('.count-info');
    if (oldList) oldList.remove();
    if (oldCount) oldCount.remove();
    
    const countInfo = createElement('p', `Найдено постов: ${posts.length}`, 'count-info');
    app.appendChild(countInfo);
    
    const list = showPostsList(posts);
    app.appendChild(list);
}

function searchPosts(searchTerm, app) {
    if (!window.currentPosts) return;
    
    const filteredPosts = window.currentPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    showPostsListComponent(filteredPosts, app);
}