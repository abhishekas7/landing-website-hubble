import pool from "@/app/lib/db";

export interface ExhibitorData {
  companyName: string;
  country: string;
  hallNo: string;
  boothNo: string;
  location: string;
  imageUrl: string;
  href: string;
}

export async function saveExhibitors(
  exhibitors: ExhibitorData[]
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const exhibitor of exhibitors) {
      // --------------------------------
      // 1. Country
      // --------------------------------

      const countryResult = await client.query(
        `
        INSERT INTO countries (name)
        VALUES ($1)
        ON CONFLICT (name)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id
        `,
        [exhibitor.country]
      );

      const countryId = countryResult.rows[0].id;

      // --------------------------------
      // 2. Event
      // --------------------------------

      const eventResult = await client.query(
        `
        INSERT INTO events (name)
        VALUES ($1)
        ON CONFLICT (name)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id
        `,
        [exhibitor.location]
      );

      const eventId = eventResult.rows[0].id;

      // --------------------------------
      // 3. Company
      // --------------------------------

      const companyResult = await client.query(
        `
        INSERT INTO companies (
          name,
          country_id,
          image_url,
          source_url
        )
        VALUES ($1, $2, $3, $4)

        ON CONFLICT (name)
        DO UPDATE SET
          country_id = EXCLUDED.country_id,
          image_url = EXCLUDED.image_url,
          source_url = EXCLUDED.source_url

        RETURNING id
        `,
        [
          exhibitor.companyName,
          countryId,
          exhibitor.imageUrl,
          exhibitor.href,
        ]
      );

      const companyId = companyResult.rows[0].id;

      // --------------------------------
      // 4. Hall
      // --------------------------------

      const hallResult = await client.query(
        `
        INSERT INTO halls (
          event_id,
          hall_no
        )
        VALUES ($1, $2)

        ON CONFLICT (event_id, hall_no)
        DO UPDATE SET hall_no = EXCLUDED.hall_no

        RETURNING id
        `,
        [
          eventId,
          exhibitor.hallNo,
        ]
      );

      const hallId = hallResult.rows[0].id;

      // --------------------------------
      // 5. Booth
      // --------------------------------

      const boothResult = await client.query(
        `
        INSERT INTO booths (
          hall_id,
          booth_no
        )
        VALUES ($1, $2)

        ON CONFLICT (hall_id, booth_no)
        DO UPDATE SET booth_no = EXCLUDED.booth_no

        RETURNING id
        `,
        [
          hallId,
          exhibitor.boothNo,
        ]
      );

      const boothId = boothResult.rows[0].id;

      // --------------------------------
      // 6. Exhibitor relationship
      // --------------------------------

      await client.query(
        `
        INSERT INTO exhibitors (
          company_id,
          booth_id
        )
        VALUES ($1, $2)

        ON CONFLICT (company_id, booth_id)
        DO NOTHING
        `,
        [
          companyId,
          boothId,
        ]
      );
    }

    await client.query("COMMIT");

    return {
      success: true,
      count: exhibitors.length,
    };
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}