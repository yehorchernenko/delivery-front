import Global from '../global';
import axios from 'axios'

export const orderService = {
    my
};

async function my() {
    const token = localStorage.getItem('token');

    const result = await axios( {
        method: 'get',
        url: `${Global.host}/api/order/my`,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    });
    return result
}