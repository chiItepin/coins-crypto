import axios from 'axios';

const baseUrl = 'https://api.coingecko.com/api/v3/';
const headers = {
  'Content-type': 'application/json; charset=UTF-8',
};

const api = {
  getGlobalData: () => axios.get(`${baseUrl}global`, headers),
  listCoins: () => axios.get(`${baseUrl}coins/list`, headers),
  getCoin: (id) => axios.get(`${baseUrl}coins/${id}`, headers),
  getCoinCategories: () => axios.get(`${baseUrl}coins/categories?order=market_cap_desc`, headers),
};

export default api;
