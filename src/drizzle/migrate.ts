import 'dotenv/config';
import { db } from './db';
import { sql } from 'drizzle-orm';

// Migration function to alter the books table
async function alterBooksTable() {
  console.log('======== Altering Books Table ========');

  try {
    // Step 1: Add 'year' column as nullable if it doesn't exist
    await db.execute(sql`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name='books' 
          AND column_name='year'
        ) THEN
          ALTER TABLE books ADD COLUMN year INT;
        END IF;
      END $$;
    `);

    // Step 2: Update existing rows with a default value for 'year'
    await db.execute(sql`
      UPDATE books
      SET year = EXTRACT(YEAR FROM CURRENT_DATE)
      WHERE year IS NULL;
    `);

    // Step 3: Alter 'year' column to be NOT NULL
    await db.execute(sql`
      ALTER TABLE books
      ALTER COLUMN year SET NOT NULL;
    `);

    // Drop 'published_date', 'isbn', and 'pages' columns if they exist
    await db.execute(sql`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name='books' 
          AND column_name='published_date'
        ) THEN
          ALTER TABLE books DROP COLUMN published_date;
        END IF;
      END $$;
    `);

    await db.execute(sql`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name='books' 
          AND column_name='isbn'
        ) THEN
          ALTER TABLE books DROP COLUMN isbn;
        END IF;
      END $$;
    `);

    await db.execute(sql`
      DO $$ 
      BEGIN
        IF EXISTS (
          SELECT 1 
          FROM information_schema.columns 
          WHERE table_name='books' 
          AND column_name='pages'
        ) THEN
          ALTER TABLE books DROP COLUMN pages;
        END IF;
      END $$;
    `);

    console.log('======== Alteration of Books Table Completed ========');
  } catch (err) {
    const error = err as Error; // Cast error to Error type
    console.error('Alteration error:', error.message);
  } finally {
    process.exit(0);
  }
}

alterBooksTable().catch((err) => {
  const error = err as Error; // Cast error to Error type
  console.error('Alteration error:', error.message);
  process.exit(1);
});
