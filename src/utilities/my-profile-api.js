import sendRequest from './send-request';
const BASE_URL = '/api/profiles';

export async function getUserInformation(){
    return sendRequest(BASE_URL)
}

export function updateProfileImage(newProfileImageURL){
    const imageURLData = {
        content: newProfileImageURL
    }
    return sendRequest(`${BASE_URL}/updateProfileImage`, 'POST', imageURLData);
}

export function updateBio(newBioText){
    const bioTextData = {
        content: newBioText
    }
    return sendRequest(`${BASE_URL}/updateBio`, 'POST', bioTextData);
}

export function updateLocation(newLocationtext){
    const locationTextData = {
        content: newLocationtext
    }
    return sendRequest(`${BASE_URL}/updateLocation`, 'POST', locationTextData);
}

