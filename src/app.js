import { createElement } from './utils/dom.js';
import { showUsersPage } from './pages/users.js';

const app = document.getElementById('app');

function router() {
    const hash = window.location.hash;
    app.innerHTML = '';
    
    if (hash === '#users' || hash === '') {
        showUsersPage(app);
    } else {
        app.appendChild(createElement('h1', 'Страница не найдена'));
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);