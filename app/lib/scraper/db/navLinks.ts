import pool from "@/app/lib/db";

export interface NavLinkData {
  text: string;
  href: string;
}

export async function saveNavLinks(navLinks: NavLinkData[]) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const link of navLinks) {
      await client.query(
        `
        INSERT INTO nav_links (text, href)
        VALUES ($1, $2)
        ON CONFLICT (href)
        DO UPDATE SET text = EXCLUDED.text
        `,
        [link.text, link.href]
      );
    }

    await client.query("COMMIT");

    return {
      success: true,
      count: navLinks.length,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
