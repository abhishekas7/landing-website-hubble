export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startup } = await import("@/app/lib/scraper/db/startup");
    startup().catch((err) => {
      console.error("Startup scraping error:", err);
    });
  }
}
