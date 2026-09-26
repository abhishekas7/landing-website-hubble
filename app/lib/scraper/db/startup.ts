// app/lib/db/startup.ts

import { extractExhibitors } from "../exhibitors";
import { saveExhibitors } from "./exhibitors";
import { saveNavLinks } from "./navLinks";
import { initDatabase } from "./initDb";

export async function startup() {
  console.log("Starting application initialization...");

  // 1. Create tables
  await initDatabase();

  console.log("Database initialized");

  // 2. Scrape website
  const { exhibitors, navLinks } = await extractExhibitors();

  console.log("navLinks", navLinks);
  console.log(`Scraped ${exhibitors.length} exhibitors`);

  // 3. Push data to PostgreSQL
  const result = await saveExhibitors(exhibitors);
  const navResult = await saveNavLinks(navLinks);

  console.log(`Saved ${result.count} exhibitors, ${navResult.count} nav links`);

  console.log("Application initialization completed");
}