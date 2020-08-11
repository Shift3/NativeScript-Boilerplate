const production = true;

const automaticLogin = {
    email: '',
    password: ''
};
const apiPrefix = 'http://192.168.10.106:8000/wp-json/wp/v2';
const hideLogs = true;

export const environment = {
    apiPrefix,
    automaticLogin,
    hideLogs,
    production
};
