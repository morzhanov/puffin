import axios from 'axios'

const access_key = 'bd550d8c8a3a177714ef14a40bb2437b4ac4aec9590669ff0ca3c7135e3b74d4'

const setConfig = (config) => ({
  headers: {
    'Authorization': `Client-ID ${access_key}`
  },
  ...config
})

export const api = {
  postSearch: (query, page) => {
    const url = `https://api.unsplash.com/search/photos/?page=${page}&per_page=30&query=${query}`
    return axios.get(url, setConfig())
  }
}
