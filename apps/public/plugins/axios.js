import axios from 'axios'

let baseURL = process.env.apiUrl

export default axios.create({
  baseURL
})
