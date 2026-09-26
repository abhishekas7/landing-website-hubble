import { chromium } from "playwright";

export async function extractExhibitors() {
  let browser;

  try {
    browser = await chromium.launch({
      channel: "chrome",
      headless: true,
    });

    const page = await browser.newPage();

    const url =
      "https://mmiconnect.in/app/catalogue/exhibitors/ep-blr-2026";

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const exhibitorsXpath =
      "/html/body/vex-root/vex-catalogue-layout/vex-layout/div/mat-sidenav-container/mat-sidenav-content/main/vex-exhibitors/vex-page-layout/vex-page-layout-content/div/div[3]/div/div";

    const exhibitorsContainer =
      page.locator(`xpath=${exhibitorsXpath}`);

    await exhibitorsContainer.waitFor({
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

    return exhibitors;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}