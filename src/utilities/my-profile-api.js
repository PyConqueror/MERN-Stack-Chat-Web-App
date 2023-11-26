import sendRequest from './send-request';
const BASE_URL = '/api/chats';

export function show(){
    sendRequest(`${BASE_URL}/${id}/profile`);
}