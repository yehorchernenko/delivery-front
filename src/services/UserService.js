import Global from '../global';
import axios from 'axios'

export const userService = {
    edit,
    get
};

async function edit(user) {
    const result = await axios( {
        method: 'put',
        url: `${Global.host}/api/users/${user._id}`,
        data: user,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return result
}

async function get(id) {
    const result = await axios( {
        method: 'get',
        url: `${Global.host}/api/users/${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return result
}