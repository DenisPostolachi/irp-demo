import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;
const baseUrl = '/reports/asnumber';
const getDataTable = axios
  .get(`${apiUrl}${baseUrl}`, {
    params: {
      page: 1,
      pageSize: 10,
    },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    throw err;
  });

export { getDataTable };
