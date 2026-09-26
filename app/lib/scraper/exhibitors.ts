import { chromium, type Page } from "playwright";

export interface ExhibitorLink {
  name: string;
  url: string;
}

export interface Exhibitor {
  name: string | null;
  url: string;
}

const CATALOGUE_URL =
  "https://mmiconnect.in/app/catalogue/exhibitors/ep-blr-2026?first=100";

/**
 * Extract all exhibitor links from catalogue page
 */
async function getExhibitorLinks(
  page: Page
): Promise<ExhibitorLink[]> {
  console.log("Opening catalogue...");

  await page.goto(CATALOGUE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });

  console.log("Page loaded");

  // Wait for Angular to render
  await page.waitForTimeout(5_000);
  

  const exhibitors = await page
    .locator(
      'a[href*="/app/catalogue/exhibitor-detail/"]'
    )
    .evaluateAll((links) => {
      console.log(links);
      
      return links.map((link) => ({
        name: link.textContent?.trim() || "",
        url: new URL(
          link.getAttribute("href") || "",
          location.origin
        ).href,
      }));
    });
    

  // Remove duplicate URLs
  const uniqueExhibitors = Array.from(
    new Map(
      exhibitors.map((item) => [item.url, item])
    ).values()
  );

  console.log(
    `Found ${uniqueExhibitors.length} exhibitors`
  );

  return uniqueExhibitors;
}

/**
 * Scrape exhibitors
 */
export async function scrapeExhibitors(): Promise<Exhibitor[]> {
  let browser;

  try {
    browser = await chromium.launch({
      headless: true,

      // Use installed Google Chrome
      channel: "chrome",
    });

    const page = await browser.newPage({
      viewport: {
        width: 1440,
        height: 900,
      },
    });

    const exhibitors = await getExhibitorLinks(page);

    const results: Exhibitor[] = [];

    for (let i = 0; i < exhibitors.length; i++) {
      const exhibitor = exhibitors[i];

      console.log(
        `[${i + 1}/${exhibitors.length}] ${exhibitor.name}`
      );

      console.log(exhibitors);
      

      results.push({
        name: exhibitor.name,
        url: exhibitor.url,
      });
    }

    return results;
  } finally {
    if (browser) {
      await browser.close();

      console.log("Browser closed");
    }
  }
}