import { NextResponse } from "next/server";
import { extractExhibitors } from "@/app/lib/scraper/exhibitors";
import { saveExhibitors } from "@/app/lib/scraper/db/exhibitors";
import { initDatabase } from "@/app/lib/scraper/db/initDb";


export async function POST() {
  try {
    //Create tables if they don't exist
    await initDatabase();

    //Scrape website
    const { exhibitors, navLinks } = await extractExhibitors();

    //Save data
    const result = await saveExhibitors(exhibitors);

    return NextResponse.json({
      success: true,
      scraped: exhibitors.length,
      saved: result.count,
      navLinks,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to scrape and save exhibitors",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}