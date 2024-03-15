import axios from "axios";
const client = axios.create({
  baseURL: 'http://192.168.88.74:5789',
});
//mobile ip address 192.168.88.74
export default client;