import axios from 'axios';

const api = axios.create({
    baseURL: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com'
    // baseURL: 'http://localhost:3000'
});

export default api;