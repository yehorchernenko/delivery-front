import Global from '../global';
import axios from 'axios'

export const authService = {
    register,
    login
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