# TayNgang Studio API - AI Coding Agent Instructions

## Architecture Overview

This is a **3-layer .NET 8 Web API** for an e-commerce studio system:

- **`tayngangstudio_sever/`** - Presentation Layer (Controllers, Middleware registration)
- **`BusinessLogicLayer/`** - Business Logic Layer (Services, DTOs, Business Rules)
- **`DataAccessLayer/`** - Data Access Layer (EF Core, Models, Repositories)

**Critical Pattern**: Each layer references only the layer below it. Controllers call Services, Services call Repositories, Repositories interact with DbContext.

## Key Configuration Patterns

### AppConfiguration System

All configuration is strongly-typed through `AppConfiguration.cs` with nested classes:

```csharp
// Register as singleton in Program.cs
var configuration = builder.Configuration.Get<AppConfiguration>()!;
builder.Services.AddSingleton(configuration);
```

Configuration sections: `AppSettings`, `ConnectionStrings`, `R2Config` (Cloudflare), `SmtpSettings`, `PayOSConfig` (Payment).

### Dependency Injection Extensions

Services are organized in extension methods in `tayngangstudio_sever/Extensions/`:

- `AddScopeService()` - Business layer services
- `AddAWSService()` - Cloudflare R2 storage
- `AddPaymentService()` - PayOS payment integration

## Business Logic Patterns

### CRUD Services Architecture

Base pattern using generics for consistent CRUD operations:

```csharp
// All CRUD services inherit from CrudService<CreateDTO, GetDTO, UpdateDTO, Entity>
public class ProductService : CrudService<CreateProductDTO, GetProductDTO, UpdateProductDTO, Product>
```

Controllers similarly inherit from `CrudController<CreateDTO, GetDTO, UpdateDTO, T>` for consistent REST endpoints.

### State Management

Orders use **Stateless state machine** (`OrderStateMachine.cs`) with defined transitions:

- `Pending → Canceled/Completed`
- Terminal states ignore repeated triggers

### DTO Validation

DTOs use comprehensive data annotations with **Vietnamese phone validation**:

```csharp
[RegularExpression(@"^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]...)", ErrorMessage = "Invalid {0}, {0} have to be Vietnamese phone!")]
```

## Data Access Patterns

### Repository Pattern Implementation

- **Generic Repository**: `IGenericRepository<T>` with expression-based queries
- **Unit of Work**: Manages transactions across repositories
- **Composite Keys**: `OrderDetail` and `CartItem` use composite primary keys defined in `OnModelCreating`

### Entity Framework Configuration

- Uses SQL Server with `ApplicationDbContext`
- Navigation properties configured explicitly in `OnModelCreating`
- Base entity pattern with `BaseEntity` for common properties

## Authentication & Authorization

### Custom JWT Middleware

`JwtMiddleware` extracts and validates JWT tokens, setting `HttpContext.User` with claims:

- `id`, `ClaimTypes.Role`, `ClaimTypes.Name`, `ClaimTypes.Email`

### Custom Authorization Attributes

- `[AllowAnonymous]` - Skip authentication
- `[Authorize(Roles = "Manager")]` - Role-based access

**Important**: Uses custom attributes, NOT ASP.NET Core's built-in `[Authorize]`.

## External Integrations

### Image Upload

Uses **Cloudflare R2** (S3-compatible) via `ImageUploadService`. Images are processed with **SixLabors.ImageSharp** for resizing/optimization.

### Payment Processing

**PayOS** integration for Vietnamese payment methods. Configuration in `PayOSConfig` section.

### Email Service

SMTP configuration for notifications using Gmail SMTP server.

## Development Workflows

### Database Operations

```bash
# Run from solution root
dotnet ef migrations add MigrationName --project DataAccessLayer --startup-project tayngangstudio_sever
dotnet ef database update --project DataAccessLayer --startup-project tayngangstudio_sever
```

### Build & Run

```bash
# Build solution
dotnet build tayngangstudio_sever.sln

# Run API (from tayngangstudio_sever directory)
dotnet run --project tayngangstudio_sever
```

API documentation available at `/swagger` when running locally.

## Project-Specific Conventions

### Naming Patterns

- Services: `{Entity}Service` (e.g., `ProductService`, `OrderService`)
- DTOs: `{Entity}DTO`, `Create{Entity}DTO`, `Update{Entity}DTO`
- Controllers: Organized by access level (`Auth/`, `Customer/`, `Manager/`)

### Error Handling

Global error middleware (`ErrorHandlerMiddleware`) catches and formats exceptions consistently.

### CORS Configuration

Configured for React frontend on `http://localhost:3000` with policy name "QuachKhangPolicy".

## Critical Implementation Notes

1. **AutoMapper** is configured globally for DTO mapping
2. **JSON serialization** configured with enum string conversion and cycle handling
3. **Vietnamese locale** considerations in validation patterns
4. **Cloudflare R2** used instead of AWS S3 (note the configuration differences)
5. **Custom authentication** implementation rather than ASP.NET Core Identity
