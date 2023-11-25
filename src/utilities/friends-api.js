import sendRequest from './send-request';
const BASE_URL = '/api/users';

export function getFriends() {
    return sendRequest(`${BASE_URL}/getFriends`);
}