import axios from 'axios';

export default axios.create({
    // baseURL: 'https://cors-anywhere.herokuapp.com/http://127.0.0.1:8001/api/'
    baseURL: 'http://ec2-34-234-75-154.compute-1.amazonaws.com/api/'

    // baseURL: 'http://127.0.0.1:3000/api/'
});