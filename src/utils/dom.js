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