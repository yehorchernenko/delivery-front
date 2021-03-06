import Global from '../global';
import axios from 'axios'

export const orderService = {
    my,
    byID,
    add
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

async function byID(ID) {

    const result = await axios( {
        method: 'get',
        url: `${Global.host}/api/order/byID/${ID}`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return result
}

async function add(body) {
    const token = localStorage.getItem('token');

    const result = await axios( {
        method: 'post',
        url: `${Global.host}/api/order/add`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    });
    return result
}