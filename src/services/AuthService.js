import Global from '../global';
import axios from 'axios'

export const authService = {
    register,
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