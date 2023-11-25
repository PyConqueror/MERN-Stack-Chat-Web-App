// Define API service utility functions
//   Include functions for making API requests to the backend:
//     - Fetch Chats
//     - Fetch Community Posts
//     - Submit New Post
//     - WebSocket Initialization for real-time chat(i will do it)

import sendRequest from './send-request';
const BASE_URL = '/api/chats';

export function getConversation(ID) {
    sendRequest(`${BASE_URL}/${ID}`);
}