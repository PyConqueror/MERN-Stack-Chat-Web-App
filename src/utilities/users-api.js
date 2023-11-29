// users-api.js

// Add the following import
import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export function searchUsers(query){
  return sendRequest(`${BASE_URL}/searchUsers?query=${query}`, 'GET')
}

export function addFriend(id){
  return sendRequest(`${BASE_URL}/addFriend/${id}`, 'POST')
}

export function getPending() {
  return sendRequest(`${BASE_URL}/pending`)
}

export function addFriendRequest(friendID) {
  sendRequest(`${BASE_URL}/addFriendRequest/${friendID}`, 'POST')
}

export function denyRequest(friendID) {
  sendRequest(`${BASE_URL}/denyFriendRequest/${friendID}`, 'POST')
}
