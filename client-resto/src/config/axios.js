import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export default customAxios;
