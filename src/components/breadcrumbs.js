import { createElement, createLink } from '../utils/dom.js';

export function createBreadcrumbs() {
    const breadcrumbs = createElement('div', '', 'breadcrumbs');
    const hash = window.location.hash;
    
    const links = [
        { text: 'Главная', hash: '#users' }
    ];
    
    if (hash.includes('#todos')) {
        links.push({ text: 'Задачи', hash: '#users#todos' });
    }
    
    links.forEach((link, index) => {
        if (index > 0) {
            breadcrumbs.appendChild(createElement('span', ' > '));
        }
        
        if (index === links.length - 1) {
            breadcrumbs.appendChild(createElement('span', link.text));
        } else {
            breadcrumbs.appendChild(createLink(link.text, link.hash));
        }
    });
    
    return breadcrumbs;
}