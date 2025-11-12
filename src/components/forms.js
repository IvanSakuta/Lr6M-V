import { createElement, createButton } from '../utils/dom.js';
import { getCustomUsers, saveCustomUsers, saveCustomTodos, getCustomTodos } from '../utils/storage.js';
import { isUserUnique } from '../utils/validation.js';
import { getUsers } from '../api/users.js';


export function createAddUserForm(onUserAdded) {
    const form = createElement('div', '', 'add-form');
    form.appendChild(createElement('h3', 'Добавить нового пользователя'));
    
    const nameInput = createElement('input');
    nameInput.placeholder = 'Имя пользователя';
    
    const emailInput = createElement('input');
    emailInput.placeholder = 'Email';
    emailInput.type = 'email';
    
    const phoneInput = createElement('input');
    phoneInput.placeholder = 'Телефон';
    
    const errorMessage = createElement('p', '', 'error-message');
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    
    const addButton = createElement('button', 'Добавить пользователя');
    
    addButton.onclick = async () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (name && email && phone) {
            const customUsers = getCustomUsers();
            const apiUsers = await getUsers();
<<<<<<< HEAD
            const validation = isUserUnique(name, email,phone, customUsers, apiUsers);
=======
            const validation = isUserUnique(name, email, phone, customUsers, apiUsers);
>>>>>>> 612754a432c091a2d08c67e09d3a70b33c04e8cf
            
            if (!validation.isUnique) {
                errorMessage.textContent = validation.message;
                errorMessage.style.display = 'block';
                return;
            }
            
            addNewUser(name, email, phone);
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            errorMessage.style.display = 'none';
            if (onUserAdded) onUserAdded();
        } else {
            errorMessage.textContent = 'Заполните все поля!';
            errorMessage.style.display = 'block';
        }
    };
    
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(phoneInput);
    form.appendChild(errorMessage);
    form.appendChild(addButton);
    
    return form;
}

function addNewUser(name, email, phone) {
    const customUsers = getCustomUsers();
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone
    };
    
    customUsers.push(newUser);
    saveCustomUsers(customUsers);
    alert('Пользователь добавлен!');
}

export function createAddTodoForm(userId, userName, onTodoAdded) {
    const overlay = createElement('div', '', 'modal-overlay');

    const modal = createElement('div', '', 'modal');
    
    const form = createElement('div', '', 'add-form modal-form');
    form.appendChild(createElement('h3', `Добавить задачу для: ${userName}`));
    
    const titleInput = createElement('input');
    titleInput.placeholder = 'Название задачи';
    titleInput.style.width = '100%';
    titleInput.style.padding = '8px';
    titleInput.style.boxSizing = 'border-box';
    titleInput.focus(); 
    
    const checkboxContainer = createElement('div', '', 'checkbox-container');
    
    const completedCheckbox = createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.id = 'completedCheckbox';
    
    const completedLabel = createElement('label', 'Выполнено');
    completedLabel.htmlFor = 'completedCheckbox';
    completedLabel.style.cursor = 'pointer';
    
    checkboxContainer.appendChild(completedCheckbox);
    checkboxContainer.appendChild(completedLabel);
    
    const buttonsContainer = createElement('div', '', 'form-buttons');
    
    const addButton = createButton('Добавить задачу', () => {
        const title = titleInput.value.trim();
        if (title) {
            addNewTodo(userId, title, completedCheckbox.checked, onTodoAdded);
            closeModal();
        } else {
            alert('Введите название задачи!');
            titleInput.focus();
        }
    }, 'add-btn');
    
    const cancelButton = createButton('Отмена', closeModal, 'cancel-btn');
    
    overlay.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    function closeModal() {
        overlay.remove();
        if (onTodoAdded) onTodoAdded();
    }
    
    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(cancelButton);
    
    form.appendChild(titleInput);
    form.appendChild(checkboxContainer);
    form.appendChild(buttonsContainer);
    
    modal.appendChild(form);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    return overlay;
}

function addNewTodo(userId, title, completed = false, onTodoAdded) {
    const customTodos = getCustomTodos();
    const newTodo = {
        id: Date.now(),
        userId: userId,
        title: title,
        completed: completed
    };
    customTodos.push(newTodo);
    saveCustomTodos(customTodos);
    
    if (onTodoAdded) {
        onTodoAdded();
    }
    
    alert('Задача добавлена!');
}