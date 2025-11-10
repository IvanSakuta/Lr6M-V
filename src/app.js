import { createElement } from './utils/dom.js';

const app = document.getElementById('app');

function router() {
    const hash = window.location.hash;
    app.innerHTML = '';
    
    if (hash === '#users' || hash === '') {
        app.appendChild(createElement('h1', 'Пользователи'));
    } else {
        app.appendChild(createElement('h1', 'Страница не найдена'));
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);