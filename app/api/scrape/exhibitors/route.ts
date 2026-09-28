import { NextResponse } from "next/server";
import { extractExhibitors } from "@/app/lib/scraper/exhibitors";
import { saveExhibitors } from "@/app/lib/scraper/db/exhibitors";
import { saveNavLinks } from "@/app/lib/scraper/db/navLinks";
import { initDatabase } from "@/app/lib/scraper/db/initDb";
import pool from "@/app/lib/db";

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
    try {
      await initDatabase();
    } catch (dbErr) {
      console.warn("DB init warning:", dbErr instanceof Error ? dbErr.message : dbErr);
    }

    // Scrape website with pagination
    const { exhibitors, navLinks, total } = await extractExhibitors(page, limit);

    // Save data to DB (non-fatal if DB is offline or busy)
    let savedCount = 0;
    try {
      const result = await saveExhibitors(exhibitors);
      savedCount = result.count;
      if (navLinks && navLinks.length > 0) {
        await saveNavLinks(navLinks);
      }
    } catch (dbErr) {
      console.error("DB save error:", dbErr instanceof Error ? dbErr.message : dbErr);
    }

    return NextResponse.json({
      success: true,
      page,
      limit,
      total: total ?? exhibitors.length,
      scraped: exhibitors.length,
      saved: savedCount,
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
  try {
    console.log("fetching nav-links");
    let navLinks = await pool.query(`
      SELECT * FROM nav_links
    `);
    return NextResponse.json({
      success: true,
      message: "Scrape and save exhibitors",
      navLinks: navLinks.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

