import { NextResponse } from "next/server";
import { extractExhibitors } from "@/app/lib/scraper/exhibitors";
import { saveExhibitors } from "@/app/lib/scraper/db/exhibitors";
import { initDatabase } from "@/app/lib/scraper/db/initDb";


export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    let body: { page?: number | string; limit?: number | string } = {};
    try {
      body = (await req.json()) as { page?: number | string; limit?: number | string };
    } catch {
      // Body is optional or empty
    }

    const page = Math.max(1, parseInt(String(body?.page ?? searchParams.get("page") ?? "1"), 10) || 1);
    const limit = Math.max(1, parseInt(String(body?.limit ?? searchParams.get("limit") ?? "20"), 10) || 20);

    // Create tables if they don't exist
    await initDatabase();

    // Scrape website with pagination
    const { exhibitors, navLinks, total } = await extractExhibitors(page, limit);

    // Save data
    const result = await saveExhibitors(exhibitors);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total: total ?? exhibitors.length,
      scraped: exhibitors.length,
      saved: result.count,
      exhibitors: exhibitors,
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

export async function GET(req: Request) {
  return POST(req);
}