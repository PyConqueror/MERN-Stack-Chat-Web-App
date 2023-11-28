import sendRequest from './send-request';
const BASE_URL = '/api/communities';

export function getOneGroup() {
    return sendRequest(`${BASE_URL}`)
}

export function getAllGroups() {
    return sendRequest(`${BASE_URL}/allGroups`);
}

export function getPosts(groupID) {
    return sendRequest(`${BASE_URL}/${groupID}`);
}

export function getComments(postID) {
    return sendRequest(`${BASE_URL}/${postID}/comments`);
}

export function createGroup(formData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', formData)
}

export function createPost(groupID, formData) {
    sendRequest(`${BASE_URL}/${groupID}/create`, 'POST', formData)
}

export function createComment(postID, formData) {
    sendRequest(`${BASE_URL}/${postID}/comments/create`, 'POST', formData)
}