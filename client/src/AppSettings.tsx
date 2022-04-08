export class AppSettings {
    static readonly SERVER_PORT = 8000;
    static readonly SERVER_URL = 'http://localhost';
    static readonly GET_USERS_URL = '/users';
    static readonly GET_USER_LOGINS_URL = '/users/:id/relationships/logins'; /// must use .replace(":id", id_value)
    static readonly NUMBER_TRIES_USERS_LIST = 5;
    static readonly NUMBER_RELOADS_USER_LOGINS = 3;
}