export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { initDatabase } = await import(
      "@/app/lib/scraper/db/initDb"
    );
    const { extractExhibitors } = await import(
      "@/app/lib/scraper/exhibitors"
    );
    const { saveExhibitors } = await import(
      "@/app/lib/scraper/db/exhibitors"
    );

    console.log("[startup] Initialising database...");
    await initDatabase();

    console.log("[startup] Scraping exhibitors...");
    const exhibitors = await extractExhibitors();

    console.log(
      `[startup] Scraped ${exhibitors.length} exhibitors. Saving...`
    );
    const result = await saveExhibitors(exhibitors);

    console.log(
      `[startup] Done  saved ${result.count} exhibitors.`
    );
  } catch (err) {
    // Log but don't crash the server if the scrape fails on boot.
    console.error("[startup] Scraper failed:", err);
  }
}