const reportsData = [];

for (let i = 1; i <= 50; i++) {
  reportsData.push({
    id: i,
    time: `${Math.floor(Math.random() * 24)} - ${Math.floor(
      Math.random() * 60,
    )} - ${Math.floor(Math.random() * 60)}`,
    asn: Math.floor(10000 + Math.random() * 90000),
    asName: `Company ${i}`,
    volume: `${Math.floor(Math.random() * 100)} GB`,
  });
}

export { reportsData };
