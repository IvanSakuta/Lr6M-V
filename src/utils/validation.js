export function isUserUnique(name, email, phone, customUsers, apiUsers) {

    if (!/\S+@\S+\.\S+/.test(email)) {
        return { isUnique: false, message: 'Некорректный формат email' };
    }
    if(!/\+375(25|29|33|44)\d{7}$/.test(phone)){
        return { isUnique: false, message: 'Некорректный формат номера' };
    }

    const existingCustomUser = customUsers.find(user => 
        user.name.toLowerCase() === name.toLowerCase() || 
        user.email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingCustomUser) {
        return { isUnique: false, message: 'Пользователь с таким именем или email уже существует в ваших пользователях' };
    }
    
    const existingApiUser = apiUsers.find(user => 
        user.name.toLowerCase() === name.toLowerCase() || 
        user.email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingApiUser) {
        return { isUnique: false, message: 'Пользователь с таким именем или email уже существует в системе' };
    }
    
    return { isUnique: true, message: '' };
}