import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;
async function getGraph(start, end) {
  const response = await axios.get(`${apiUrl}/graphs/timeline`, {
    params: { start, end },
  });

  return response.data;
}

export { getGraph };
