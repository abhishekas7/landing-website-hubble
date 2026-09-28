
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
    const { searchParams } = new URL(req.url);

    let body: { page?: number | string; limit?: number | string } = {};
    try {
      body = (await req.json()) as { page?: number | string; limit?: number | string };
    } catch {
      // Body is optional or empty
    }

    const page = Math.max(1, parseInt(String(body?.page ?? searchParams.get("page") ?? "1"), 10) || 1);
    const limit = Math.max(1, parseInt(String(body?.limit ?? searchParams.get("limit") ?? "20"), 10) || 20);
    let navLinks = await pool.query(`
      SELECT * FROM nav_links
    `);
    // Ensure the view exists (and include imageUrl and href for the frontend)
    await pool.query(`
  CREATE OR REPLACE VIEW exhibitor_details AS
  SELECT 
    C.name AS "companyName",
    CO.name AS "country",
    H.hall_no AS "hallNo",
    B.booth_no AS "boothNo",
    EV.name AS "location",
    C.image_url AS "imageUrl",
    C.source_url AS "href"
  FROM exhibitors E
  JOIN companies C ON E.company_id = C.id
  JOIN countries CO ON C.country_id = CO.id
  JOIN booths B ON E.booth_id = B.id
  JOIN halls H ON B.hall_id = H.id
  JOIN events EV ON H.event_id = EV.id;
`);

    // Fetch the data from the view
    let exhibitors = await pool.query(`
      SELECT * FROM exhibitor_details ORDER BY "companyName" LIMIT $2 OFFSET $1`, [page * limit - limit, limit]);


    return NextResponse.json({
      success: true,
      message: "Scrape and save exhibitors",
      data: { exhibitors: exhibitors.rows, navLinks: navLinks.rows }
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

