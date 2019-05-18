import Global from '../global';
import axios from 'axios'

export const loginService = {
    register,
};

async function register(json) {
    const result = await axios( {
        method: 'post',
        url: `${Global.host}/api/auth/register`,
        data: json,
        headers: {'Content-Type': 'application/json',}
    });
    //const result = await fetch(`${Global.host}/api/auth/register`, options);
    return result
}