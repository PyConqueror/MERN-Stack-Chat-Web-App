import sendRequest from './send-request';
const BASE_URL = '/api/profiles';

export function updateProfileImage(newProfileImageURL){
    const imageURLData = {
        content: newProfileImageURL
    }
    sendRequest(`${BASE_URL}/updateProfileImage`, 'POST', imageURLData);
}

export function updateBio(){
    sendRequest(`${BASE_URL}/updateBio`, 'POST');
}

export function updateLocation(){
    sendRequest(`${BASE_URL}/updateLocation`, 'POST');
}

