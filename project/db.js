const { Client } = require("pg");

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432
};

const client = new Client(dbConfig);

async function connectToDatabase(retries = 5) {
  while (retries) {
    try {
      await client.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS fire_data (
          id SERIAL PRIMARY KEY,
          latitude FLOAT,
          longitude FLOAT,
          source_url TEXT
        );
      `);
      console.log("Connected to the database.");
      break;
    } catch (err) {
      console.log(`Database connection failed. Retrying in 5 seconds... (${retries} retries left)`);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // Retry after 5 seconds
    }
  }
}

async function upsertData(data, url) {
  for (const entry of data) {
    const { latitude, longitude } = entry;
    const result = await client.query(
      "SELECT * FROM fire_data WHERE latitude = $1 AND longitude = $2 AND source_url = $3",
      [latitude, longitude, url]
    );

    if (result.rows.length === 0) {
      await client.query(
        "INSERT INTO fire_data (latitude, longitude, source_url) VALUES ($1, $2, $3)",
        [latitude, longitude, url]
      );
    }
  }
}

module.exports = { connectToDatabase, upsertData };
