import sendRequest from './send-request';
const BASE_URL = '/api/communities';

export function getOneCommunity(communityId) {
    return sendRequest(`${BASE_URL}/communities/${communityId}`)
}

export function getAllCommunities() {
    return sendRequest(`${BASE_URL}/allCommunities`, 'GET');
}

export function getPosts(communityId) {
    return sendRequest(`${BASE_URL}/posts/${communityId}`);
}

export function getComments(postID) {
    return sendRequest(`${BASE_URL}/${postID}/comments`);
}

export function createCommunity(formData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', formData)
}

export function createPost(formData) {
    return sendRequest(`${BASE_URL}/createPost`, 'POST', formData)
}

export function createComment(formData) {
    return sendRequest(`${BASE_URL}/createComment`, 'POST', formData)
}

export function updateCommunity(formData){
    return sendRequest(`${BASE_URL}/updateCommunity`, 'POST', formData)
}