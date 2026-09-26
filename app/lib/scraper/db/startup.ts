// app/lib/db/startup.ts

import { extractExhibitors } from "../exhibitors";
import { saveExhibitors } from "./exhibitors";
import { initDatabase } from "./initDb";

export async function startup() {
  console.log("Starting application initialization...");

  // 1. Create tables
  await initDatabase();

  console.log("Database initialized");

  // 2. Scrape website
  const exhibitors = await extractExhibitors();

  console.log(`Scraped ${exhibitors.length} exhibitors`);

  // 3. Push data to PostgreSQL
  const result = await saveExhibitors(exhibitors);

  console.log(`Saved ${result.count} exhibitors`);

  console.log("Application initialization completed");
}