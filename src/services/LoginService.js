import Global from '../global';

export default class LoginService {
    register(json) {
        //https://dog.ceo/api/breeds/list/all' for test purpose
        return fetch(`${Global.host}/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}