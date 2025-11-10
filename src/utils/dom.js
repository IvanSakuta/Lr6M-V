export function createElement(tag, text = '', className = '') {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
}

export function createLink(text, href, className = '') {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    if (className) link.className = className;
    return link;
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function createButton(text, onClick, className = '') {
    const button = createElement('button', text, className);
    button.onclick = onClick;
    return button;
}