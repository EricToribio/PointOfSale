import axios from 'axios';

const baseUrl : string  = "http://localhost:8080/api/"

export default axios.create({
    baseURL: baseUrl ,
    withCredentials: true
})