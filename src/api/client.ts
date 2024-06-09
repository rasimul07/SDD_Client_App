import axios from "axios";
const client = axios.create({
  // baseURL: 'http://192.168.28.74:5789', //my phone
  // baseURL: 'http://10.10.84.88:5789', //makaut
  // baseURL: 'https://wild-pink-chiton-toga.cyclic.app',
  // baseURL: 'http://192.168.0.172:5789',
  baseURL: 'https://skin-disease-detector-backend.onrender.com',
  // baseURL: 'http://192.168.114.39:8989', //if i turn hotspot of my phone
});
//mobile ip address 192.168.88.74
// 10.10.78.19 //makaut //10.10.80.251
//pg// 192.168.0.172

export default client;