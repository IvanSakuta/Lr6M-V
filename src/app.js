import { createElement } from './utils/dom.js';
import { showUsersPage } from './pages/users.js';
import { showTodosPage } from './pages/todos.js';
import { showPostsPage } from './pages/posts.js';
import { showCommentsPage } from './pages/comments.js';

const app = document.getElementById('app');

function router() {
    const hash = window.location.hash;
    app.innerHTML = '';
    
    if (hash === '#users' || hash === '') {
        showUsersPage(app);
    }else if (hash === '#users#todos') {
        showTodosPage(app);
    } else if (hash === '#users#posts') {
        showPostsPage(app);
    } else if (hash === '#users#posts#comments') {
        showCommentsPage(app);
    } else {
        app.appendChild(createElement('h1', 'Страница не найдена'));
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);