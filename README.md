# Tay Ngang Studio Ca Mau

E-commerce platform for Tay Ngang Studio with separate backend API (ASP.NET Core) and frontend (Next.js).

## System Overview

**Backend**: ASP.NET Core Web API with SQL Server
**Frontend**: Next.js with TypeScript and Tailwind CSS

## Main Functions

### Customer Features

- **Authentication**: Register, login, password recovery, email verification
- **Product Browsing**: View products, filter by category, product details
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Place orders with payment integration
- **Order Management**: Track orders, view order history
- **Account**: Manage profile and personal information

### Admin Features

- **Product Management**: CRUD operations for products with image upload
- **Category Management**: Manage product categories
- **Order Management**: View, update order status, process orders
- **User Management**: Manage customer accounts and roles
- **Analytics Dashboard**: View sales statistics and reports

## Technology Stack

### Backend

- ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication
- Swagger/OpenAPI
- BCrypt for password hashing

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios for API calls
- Context API for state management

## Seed Users

Default test accounts are pre-configured in the database:

| Role     | Email             | Password |
| -------- | ----------------- | -------- |
| Admin    | admin@example.com | password |
| Customer | alice@example.com | password |

**Note**: Change these credentials in production environments.

## Getting Started

### Backend Setup

1. Configure connection string in `appsettings.json`
2. Run migrations: `dotnet ef database update`
3. Start server: `dotnet run`
4. API available at: `https://localhost:8080`

### Frontend Setup

1. Install dependencies: `npm install`
2. Configure API URL in `axios.config.ts`
3. Start dev server: `npm run dev`
4. Open browser at: `http://localhost:3000`

## Project Structure

```
tayngangstudio_sever/          # Backend API
├── DataAccessLayer/           # Models, DbContext, Migrations
├── BusinessLogicLayer/        # Services, DTOs, Logic
└── tayngangstudio_sever/      # Controllers, Startup

## License

Private project for Tay Ngang Studio Ca Mau
```
