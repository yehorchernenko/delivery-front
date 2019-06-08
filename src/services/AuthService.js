import Global from '../global';
import axios from 'axios'

export const authService = {
    register,
    login,
    me
};

async function register(json) {
    const result = await axios( {
        method: 'post',
        url: `${Global.host}/api/auth/register`,
        data: json,
        headers: {'Content-Type': 'application/json',}
    });
    return result
}

async function login(json) {
    const result = await axios( {
        method: 'post',
        url: `${Global.host}/api/auth/login`,
        data: json,
        headers: {'Content-Type': 'application/json',}
    });
    return result
}

async function me(json) {
    const token = localStorage.getItem('token');

    const result = await axios( {
        method: 'get',
        url: `${Global.host}/api/auth/me`,
        data: json,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    });
    return result
}