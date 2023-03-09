import axios from 'axios';

const api = axios.create({
    baseURL: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com'
});

export default api;