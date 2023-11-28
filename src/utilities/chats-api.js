import sendRequest from './send-request';
const BASE_URL = '/api/chats';

export async function getMessages(ID) {
    return sendRequest(`${BASE_URL}/${ID}/messages`)
}

export function sendMessage(selectedChatID, newMessage) {
    const messageData = {
        content: newMessage
    }
    sendRequest(`${BASE_URL}/send/${selectedChatID}`, 'POST', messageData);
}

export function createConversation(ID) {
   return sendRequest(`${BASE_URL}/${ID}`);
}

export function createGroup(formData) {
    sendRequest(`${BASE_URL}/create`, 'POST', formData)
}
