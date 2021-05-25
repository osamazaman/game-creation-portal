import axios from './axios/axios';
import {apiConfig} from '../../config'


async function postApi(apiCallRequest) {       
    return await axios.post(apiCallRequest.url, apiCallRequest.data, apiCallRequest.config);
}

async function getApi(apiCallRequest) {       
    return await axios.get(apiCallRequest.url, apiCallRequest.config);
}

async function putApi(apiCallRequest) {       
    return await axios.put(apiCallRequest.url, apiCallRequest.data, apiCallRequest.config);
}

export {
    getApi,
    postApi,
    putApi
};