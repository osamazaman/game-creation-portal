import axios from 'axios';
import config from '../../../config';
// Base Url

const instance = axios.create({
    baseURL: config.apiBaseUrl
});

export default instance;