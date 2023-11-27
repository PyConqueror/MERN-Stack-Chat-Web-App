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


// Define API service utility functions
//   Include functions for making API requests to the backend:
//     - Fetch Chats
//     - Fetch Community Posts
//     - Submit New Post
//     - WebSocket Initialization for real-time chat(i will do it)
