const { connectToDatabase, upsertData } = require("./db");
const { fetchCsvData } = require("./fetchCsv");

const urls = [
  "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv",
  "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/csv/MODIS_C6_1_Global_24h.csv"
];

async function updateData() {
  for (const url of urls) {
    console.log(`Fetching data from ${url}...`);
    const data = await fetchCsvData(url);
    await upsertData(data, url);
    console.log(`Data from ${url} processed.`);
  }
}

(async () => {
  await connectToDatabase();
  updateData(); // Run the update initially
  setInterval(updateData, 3 * 60 * 60 * 1000); // Schedule every 3 hours
})();
