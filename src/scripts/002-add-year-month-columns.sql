-- Migration to add year and month columns to transactions table
-- This enables monthly tracking and better organization

-- Add year and month columns
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS transaction_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
ADD COLUMN IF NOT EXISTS transaction_month INTEGER DEFAULT EXTRACT(MONTH FROM CURRENT_DATE);

-- Update existing records to have year and month based on created_at
UPDATE transactions 
SET 
  transaction_year = EXTRACT(YEAR FROM created_at),
  transaction_month = EXTRACT(MONTH FROM created_at)
WHERE transaction_year IS NULL OR transaction_month IS NULL;

-- Make the columns NOT NULL after populating existing data
ALTER TABLE transactions 
ALTER COLUMN transaction_year SET NOT NULL,
ALTER COLUMN transaction_month SET NOT NULL;

-- Create indexes for better performance on year/month queries
CREATE INDEX IF NOT EXISTS idx_transactions_year_month 
ON transactions(user_id, transaction_year, transaction_month);

CREATE INDEX IF NOT EXISTS idx_transactions_current_month 
ON transactions(user_id, transaction_year, transaction_month, created_at DESC);

-- Add a composite index for common queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_year_month_date 
ON transactions(user_id, transaction_year, transaction_month, created_at);