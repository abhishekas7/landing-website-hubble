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
    const { saveNavLinks } = await import(
      "@/app/lib/scraper/db/navLinks"
    );

    console.log("[startup] Initialising database...");
    await initDatabase();

    console.log("[startup] Scraping exhibitors...");
    const { exhibitors, navLinks } = await extractExhibitors();

    console.log("[startup] navLinks", navLinks);
    console.log(`[startup] Scraped ${exhibitors.length} exhibitors. Saving...`);
    const result = await saveExhibitors(exhibitors);
    const navResult = await saveNavLinks(navLinks);

    console.log(
      `[startup] Done — saved ${result.count} exhibitors, ${navResult.count} nav links.`
    );
  } catch (err) {
    // Log but don't crash the server if the scrape fails on boot.
    console.error("[startup] Scraper failed:", err);
  }
}