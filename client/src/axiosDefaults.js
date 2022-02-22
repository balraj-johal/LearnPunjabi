import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.headers.common['Content-Type'] = `application/x-www-form-urlencoded`;

axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export default axiosClient;