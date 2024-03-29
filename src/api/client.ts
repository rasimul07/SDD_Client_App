import axios from "axios";
const client = axios.create({
  baseURL: 'http://192.168.0.172:5789',
});
//mobile ip address 192.168.88.74
// 10.10.78.19 //makaut
//pg// 192.168.0.172
export default client;