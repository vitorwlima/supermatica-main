import axios from 'axios'
import { getAccessToken } from '../AuthenticationToken'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + getAccessToken(),
  },
})

export default api
