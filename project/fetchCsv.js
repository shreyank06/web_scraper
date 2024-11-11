const fetch = require("node-fetch");
const csv = require("csv-parser");
const fs = require("fs");

async function fetchCsvData(url) {
  const response = await fetch(url);
  const filePath = `temp_${Date.now()}.csv`;
  const fileStream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream);
    response.body.on("error", reject);
    fileStream.on("finish", resolve);
  });

  const data = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push({ latitude: row.latitude, longitude: row.longitude });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  fs.unlinkSync(filePath); // Clean up temp file
  return data;
}

module.exports = { fetchCsvData };
