import axios from "axios";
const client = axios.create({
  // baseURL: 'http://10.10.80.251:5789',
  baseURL: 'https://wild-pink-chiton-toga.cyclic.app',
});
//mobile ip address 192.168.88.74
// 10.10.78.19 //makaut //10.10.80.251
//pg// 192.168.0.172
export default client;