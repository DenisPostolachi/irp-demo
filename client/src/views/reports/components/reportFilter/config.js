const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const filters = {
  asNumber: [
    {
      name: 'AS name',
      placeholder: 'Any As name',
      key: 'asName',
    },
    {
      name: 'Page',
      placeholder: 'Page',
      key: 'page',
    },
    {
      name: 'Number of records',
      placeholder: 'Number of records',
      key: 'pageSize',
    },
  ],
  historicalRecords: [
    {
      name: 'Prefix',
      placeholder: 'Prefix',
      key: 'prefix',
    },
    {
      name: 'Number of records',
      placeholder: 'Number of records',
      key: 'pageSize',
    },
  ],
};

export { monthList, filters };
