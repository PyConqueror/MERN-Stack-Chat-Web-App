import sendRequest from './send-request';
const BASE_URL = '/api/chats';

export function updateBio(){
    sendRequest(`${BASE_URL}/updateBio`, 'POST');
}