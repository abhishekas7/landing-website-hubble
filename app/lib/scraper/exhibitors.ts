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

    return { exhibitors, navLinks };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}