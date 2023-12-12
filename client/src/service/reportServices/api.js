import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;
async function getReport(baseUrl, page = 5, pageSize = 50) {
  const url = `${baseUrl}`;
  const response = await axios.get(`${apiUrl}${url}`, {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
}

export { getReport };
