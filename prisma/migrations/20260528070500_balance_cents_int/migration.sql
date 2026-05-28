-- Convert balance from DOUBLE PRECISION to INTEGER cents.
-- Assumption: existing values already represent cents (e.g. 100000.0 -> 100000).

ALTER TABLE "users"
ALTER COLUMN "balance" TYPE INTEGER USING ROUND("balance")::INTEGER;

