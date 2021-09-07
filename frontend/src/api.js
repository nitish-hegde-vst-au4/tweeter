import axios from 'axios'

let URL = 'http://localhost:5000'

const getTweets = () => {
  return axios.get(`${URL}/api/tweets`)
}

const login = (data) => {
  return axios.post(`${URL}/api/auth/login`, data)
}

export { getTweets, login }
