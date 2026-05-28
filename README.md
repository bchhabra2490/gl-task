# Simplified Banking Backend (Setup)

## Prerequisites

- Node.js (LTS recommended)
- PostgreSQL (local install) **or** Docker

## Setup

### 1) Start PostgreSQL (Docker, optional)

```bash
docker compose up -d
```

### 2) Generate JWT keys (asymmetric, required)

Create an RSA keypair for **RS256** signing/verification:

```bash
mkdir -p keys
openssl genrsa -out keys/jwt-private.pem 2048
openssl rsa -in keys/jwt-private.pem -pubout -out keys/jwt-public.pem
```

### 3) Configure env

```bash
cp .env.example .env
```

### 4) Install deps

```bash
npm install
```

### 5) Generate Prisma client

```bash
npm run prisma:generate
```

### 6) Run migrations

```bash
npm run prisma:migrate
```

### 7) Seed the database

```bash
npm run db:seed
```

Seeds:

- Alice: `alice@example.com` / PIN `1234` / balance `100000` cents
- Bob: `bob@example.com` / PIN `5678` / balance `50000` cents

### 8) Run the server

```bash
npm run dev
```

Server runs on `http://localhost:3000` by default.

## Test the APIs

You can test everything with `curl`. (Optional) install `jq` for prettier output.

### 1) Login (get JWT)

```bash
curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","pin":"1234"}' | jq
```

Copy the `token` field and set:

```bash
TOKEN="paste_token_here"
```

### 2) Get balance (authenticated)

```bash
curl -s http://localhost:3000/users/balance \
  -H "Authorization: Bearer $TOKEN" | jq
```

### 3) Deposit funds (authenticated)

Deposits into the logged-in user’s account.

```bash
curl -s -X POST http://localhost:3000/users/deposit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"amount":500}' | jq   # 500 cents
```

## Useful dev commands

### Clear table rows

```bash
# Clear users table rows
TABLE=users npm run db:clear
```

### Reset database (drops + re-migrates + re-seeds)

```bash
npm run db:reset
```


## Assumptions Made

1. Amount is in cents/paise.
2. No tokens saved for session. Cannot invalidate tokens from server. Not generating any refresh tokens.
3. Not saving any txn history. Only current balance is stored.