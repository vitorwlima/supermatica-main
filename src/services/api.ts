import axios from 'axios'
import { getAccessToken } from '../AuthenticationToken'

const accessToken = getAccessToken()

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  headers: {
    Authorization: accessToken ? 'Bearer ' + accessToken : '',
  },
})

export default api
