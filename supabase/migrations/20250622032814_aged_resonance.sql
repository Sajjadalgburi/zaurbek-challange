/*
  # Add revenue column to videos table

  1. Changes
    - Add `revenue` column to `videos` table with numeric type
    - Set default value to 0 for existing records
    - Allow null values for flexibility

  2. Notes
    - This resolves the "column videos.revenue does not exist" error
    - Existing records will have revenue set to 0 by default
*/

-- Add revenue column to videos table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'videos' AND column_name = 'revenue'
  ) THEN
    ALTER TABLE videos ADD COLUMN revenue numeric DEFAULT 0;
  END IF;
END $$;