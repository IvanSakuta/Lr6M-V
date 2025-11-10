import { createElement, debounce } from '../utils/dom.js';

export function createSearch(placeholder, onSearch) {
    const search = createElement('input', '', 'search-box');
    search.placeholder = placeholder;
    search.type = 'text';
    
    search.addEventListener('input', debounce(onSearch, 300));
    
    return search;
}