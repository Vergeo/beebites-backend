# Beebites NestJS Backend

Food ordering platform backend built with NestJS, TypeORM, and PostgreSQL.

## Architecture

Generated from class diagram with the following modules:

| Module | Description |
|--------|-------------|
| `auth` | JWT authentication, login, register, role-based guards |
| `users` | Base user entity, CRUD |
| `customers` | Customer profile, view tenants/menu/orders |
| `tenants` | Tenant management, operational hours |
| `admin` | Admin operations (role-guarded), manage tenants & menus |
| `menu` | Menu & MenuItem management |
| `cart` | Shopping cart, add/remove items, checkout |
| `orders` | Order lifecycle, status tracking |
| `payment` | Factory Pattern: Cash, QRIS, E-Wallet payments |
| `notification` | In-app notifications for customers & tenants |
| `analytics` | Revenue reports, order summaries, top items |

## Design Patterns Used

- **Singleton** — AuthService via NestJS DI (single instance)
- **Factory Pattern** — `PaymentFactory` creates `CashPayment`, `QRISPayment`, or `EWalletPayment`
- **Repository Pattern** — `TenantData` and `OrderData` via TypeORM repositories

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 14

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DB credentials and JWT secret

# 3. Start the app (auto-syncs DB schema in development)
npm run start:dev
```

## API Documentation

Swagger UI is available at: `http://localhost:3000/api/docs`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Application port |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | `postgres` | PostgreSQL username |
| `DB_PASSWORD` | `password` | PostgreSQL password |
| `DB_DATABASE` | `beebites` | Database name |
| `JWT_SECRET` | `beebites-secret-key` | JWT signing secret |
| `JWT_EXPIRES_IN` | `7d` | JWT expiry duration |

## API Endpoints Summary

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/customers/:id/tenants` | View all tenants |
| GET | `/api/v1/customers/:id/menu/:tenantId` | View tenant menu |
| POST | `/api/v1/cart/:customerId/items` | Add item to cart |
| POST | `/api/v1/cart/:customerId/checkout/:tenantId` | Place order |
| GET | `/api/v1/customers/:id/orders/:orderId/track` | Track order |
| GET | `/api/v1/customers/:id/orders/history` | Order history |

### Tenants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/orders/tenant/:tenantId` | View incoming orders |
| PUT | `/api/v1/orders/:id/accept` | Accept order |
| PUT | `/api/v1/orders/:id/reject` | Reject order |
| PUT | `/api/v1/orders/:id/status` | Update order status |
| POST | `/api/v1/menu/:menuId/items` | Add menu item |
| PUT | `/api/v1/menu/items/:itemId` | Update menu item |
| GET | `/api/v1/analytics/summary/:tenantId` | View analytics |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/admin/tenants` | List all tenants |
| POST | `/api/v1/admin/tenants` | Add tenant |
| PUT | `/api/v1/admin/tenants/:id` | Update tenant |
| DELETE | `/api/v1/admin/tenants/:id` | Delete tenant |

### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/payment/methods` | List payment methods |
| POST | `/api/v1/payment/process` | Process payment |
| GET | `/api/v1/payment/confirm/:orderId` | Confirm payment |
