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
      component: 'AsNameInput',
      placeholder: 'Any As name',
    },
    {
      component: 'PageInput',
      placeholder: 'Page',
    },
    {
      component: 'PageSizeInput',
      placeholder: 'Number of records',
    },
  ],
  historicalRecords: [
    {
      component: 'PageSizeInput',
      placeholder: 'Number of records',
    },
    {
      component: 'PrefixInput',
      placeholder: 'Prefix',
    },
  ],
};

export { monthList, filters };
