export function isUserUnique(name, email, customUsers, apiUsers) {
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