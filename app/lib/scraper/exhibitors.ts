import { chromium } from "playwright";

export async function extractExhibitors(pageNumber?: number, limit?: number) {
  let browser;

  try {
    const launchOptions: Parameters<typeof chromium.launch>[0] = {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    };

    if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
      launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
    } else if (process.platform === "win32") {
      launchOptions.channel = "chrome";
    }

    browser = await chromium.launch(launchOptions);

    const page = await browser.newPage();

    const url =
      "https://mmiconnect.in/app/catalogue/exhibitors/ep-blr-2026";

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const navBarXpath = "/html/body/vex-root/vex-catalogue-layout/vex-layout/div/mat-sidenav-container/mat-sidenav-content/vex-toolbar/div/div[1]"
    

    const exhibitorsXpath =
      "/html/body/vex-root/vex-catalogue-layout/vex-layout/div/mat-sidenav-container/mat-sidenav-content/main/vex-exhibitors/vex-page-layout/vex-page-layout-content/div/div[3]/div/div";

    const exhibitorsContainer =
      page.locator(`xpath=${exhibitorsXpath}`);

    await exhibitorsContainer.waitFor({
      state: "visible",
      timeout: 60000,
    });

    // Wait for Angular to render the card list (<a> elements inside the container)
    await exhibitorsContainer.locator("a").first().waitFor({
      state: "visible",
      timeout: 60000,
    });

    const exhibitors =
      await exhibitorsContainer.locator("a").evaluateAll(
        (anchors) =>
          anchors.map((a) => {
            const container =
              a.querySelector("div.text-center");

            const companyName =
              container
                ?.querySelector(".text-lg.text-primary")
                ?.textContent
                ?.trim() || "";

            const divs =
              container?.querySelectorAll(
                ":scope > div"
              );

            const country =
              divs?.[1]?.textContent?.trim() || "";

            const hallBooth = divs?.[2];

            const spans =
              hallBooth?.querySelectorAll("span");

            const hallNo =
              spans?.[1]?.textContent?.trim() || "";

            const boothNo =
              spans?.[3]?.textContent?.trim() || "";

            const location =
              divs?.[3]?.textContent?.trim() || "";

            const img = a.querySelector("img");

            return {
              companyName,
              country,
              hallNo,
              boothNo,
              location,
              imageUrl: img
                ? (img as HTMLImageElement).src
                : "",
              href: (a as HTMLAnchorElement).href,
            };
          })
      );

    const navBar = page.locator(`xpath=${navBarXpath}`);

    await navBar.waitFor({
      state: "visible",
      timeout: 60000,
    });

    // Extract all <a> items inside the nav <div>
    const navLinks = await navBar.locator("a").evaluateAll(
      (anchors) =>
        anchors.map((a) => ({
          text: a.textContent?.trim() || "",
          href: (a as HTMLAnchorElement).href,
        }))
    );

    console.log("navLinks", navLinks);

    const currentPage = pageNumber && pageNumber > 0 ? pageNumber : 1;
    const currentLimit = limit && limit > 0 ? limit : 20;
    const startIndex = (currentPage - 1) * currentLimit;
    const paginatedExhibitors =
      limit !== undefined && limit > 0
        ? exhibitors.slice(startIndex, startIndex + currentLimit)
        : exhibitors;

    return { exhibitors: paginatedExhibitors, navLinks, total: exhibitors.length };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}