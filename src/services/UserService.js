import Global from '../global';
import axios from 'axios'

export const userService = {
    edit
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