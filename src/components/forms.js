import { createElement, createButton } from '../utils/dom.js';
import { getCustomUsers, saveCustomUsers } from '../utils/storage.js';


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