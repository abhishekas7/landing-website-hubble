import pool from "@/app/lib/db";

export async function initDatabase() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        country_id INTEGER REFERENCES countries(id),
        image_url TEXT,
        source_url TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS halls (
        id SERIAL PRIMARY KEY,
        event_id INTEGER NOT NULL REFERENCES events(id),
        hall_no VARCHAR(50) NOT NULL,
        UNIQUE (event_id, hall_no)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS booths (
        id SERIAL PRIMARY KEY,
        hall_id INTEGER NOT NULL REFERENCES halls(id),
        booth_no VARCHAR(50) NOT NULL,
        UNIQUE (hall_id, booth_no)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS exhibitors (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL REFERENCES companies(id),
        booth_id INTEGER NOT NULL REFERENCES booths(id),
        UNIQUE (company_id, booth_id)
      );
    `);

    await client.query("COMMIT");

    console.log("Database tables initialized successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}