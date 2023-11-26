import sendRequest from './send-request';
const BASE_URL = '/api/chats';

export function getMessages(ID) {
    sendRequest(`${BASE_URL}/${ID}/messages`);
}

export async function sendMessage(selectedChatID, newMessage) {
    const ID = selectedChatID
    const message = newMessage
    sendRequest(`${BASE_URL}/send/${ID}`, 'POST', message);
}

export function createConversation(ID) {
    sendRequest(`${BASE_URL}/${ID}`);
}


// Define API service utility functions
//   Include functions for making API requests to the backend:
//     - Fetch Chats
//     - Fetch Community Posts
//     - Submit New Post
//     - WebSocket Initialization for real-time chat(i will do it)
