import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;
async function getReport(baseUrl, filters) {
  const url = `${baseUrl}`;
  const response = await axios.get(`${apiUrl}${url}`, {
    params: { ...filters },
  });
  return response.data;
}

export { getReport };
