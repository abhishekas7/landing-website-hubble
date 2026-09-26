
import { NextResponse } from "next/server";
import { scrapeExhibitors } from "@/app/lib/scraper/exhibitors";    

export const runtime = "nodejs";

export async function GET() {
  try {
    const exhibitors = await scrapeExhibitors   ();

    return NextResponse.json({
      success: true,
      count: exhibitors.length,
      data: exhibitors,
    });
  } catch (error) {
    console.error("Scraping failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to scrape exhibitors",
      },
      {
        status: 500,
      }
    );
  }
}