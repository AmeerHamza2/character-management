#!/bin/sh
set -e

echo ""
echo "=== BACKEND STARTUP ==="
echo ""

# Wait for PostgreSQL to be ready
echo "[DB] Waiting for PostgreSQL (${DB_HOST:-postgres}:${DB_PORT:-5432})..."
until nc -z ${DB_HOST:-postgres} ${DB_PORT:-5432}; do
  sleep 2
done
echo "[DB] PostgreSQL is ready"

# Run Prisma migrations
echo "[DB] Running migrations..."
if [ "$NODE_ENV" = "production" ]; then
  npx prisma migrate deploy
else
  npx prisma migrate dev --name init --skip-seed 2>/dev/null || true
fi
echo "[DB] Migrations complete"

# Run seeder
if [ "$SEED_DB" = "true" ]; then
  echo "[DB] Running seeder..."
  npx prisma db seed
fi

echo ""
echo "[SERVER] Starting on port ${PORT:-3001}..."
echo ""

exec "$@"
