import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;
async function getGraph() {
  const response = await axios.get(`${apiUrl}/graphs/timeline`, {});
  return response.data;
}

export { getGraph };
