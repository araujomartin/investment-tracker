# Copilot Instructions - Investment Tracker

## 🎯 Project Overview

**Investment Tracker** es una aplicación fullstack para gestionar y monitorear inversiones en múltiples activos:
- **CEDEARS** (Certificados de Depósito Argentinos)
- **Acciones locales** (stocks en mercados USA)
- **Criptomonedas** (Bitcoin, Ethereum, etc.)
- **Stablecoins** (USDT, USDC con seguimiento de yields)
- **Plazos fijos** (depósitos USD y ARS)

### About the Developer
- **Experiencia**: Frontend Developer con fuerte foco en Angular (v10+ a v20)
- **Formación**: Systems Analyst, Universidad Nacional de La Pampa
- **Arquitectura**: Especialista en Clean, Screaming, y Hexagonal Architecture
- **Objetivo del proyecto**: Aprender backend con NestJS y gestión de monorepos con Nx

---

## 🏗️ Architecture & Stack

### Monorepo Structure (Nx)
```
investment-tracker/
├── apps/
│   ├── investment-tracker-api/     # NestJS Backend (Clean Architecture)
│   ├── investment-tracker-api-e2e/  # E2E tests para API
│   └── investment-tracker-web/      # Angular 21 Frontend (Zoneless)
└── libs/                            # Shared libraries (futuro)
```

### Technology Stack

#### Backend (NestJS)
- **Framework**: NestJS 11.x
- **ORM**: Prisma 7.x con PostgreSQL
- **Architecture**: Clean Architecture adaptada de experiencia frontend
- **Layers**:
  - `domain/`: Entities, Models, Repository interfaces
  - `application/`: Use cases, DTOs
  - `infrastructure/`: Persistence implementations, external services
  - `presentation/`: Controllers

#### Frontend (Angular 21)
- **Framework**: Angular 21 (SSR habilitado)
- **Change Detection**: OnPush (siempre usar `ChangeDetectionStrategy.OnPush`)
- **MCP Integration**: Usar MCP de Angular para best practices y ejemplos actualizados
- **Features modernas priorizadas**:
  - Standalone components (default en v20+, no especificar `standalone: true`)
  - Signals API para state management
  - `input()` y `output()` functions en lugar de decorators
  - `model()` para two-way binding (como alternativa a ngModel)
  - Built-in control flow (`@if`, `@for`, `@switch`)
  - **Typed Reactive Forms** (estándar recomendado)
  - Deferrable views
  - Router input binding
  - `inject()` function en lugar de constructor injection
- **Variable Scope Convention**:
  - `public readonly`: API pública del componente/servicio
  - `protected readonly`: Propiedades usadas en templates
  - `private readonly`: Lógica interna y dependencias
  - **SIEMPRE** usar `readonly` con signals

#### Database
- **Primary DB**: PostgreSQL
- **Schema Management**: Prisma Migrations
- **Output**: Custom path `src/generated/prisma/`

#### Development Tools
- **Monorepo**: Nx 22.x
- **Testing**: Jest 30.x
- **Linting**: ESLint 9.x + Angular ESLint
- **Package Manager**: npm

---

## 📋 Coding Standards & Best Practices

### General Rules
1. **TypeScript Strict Mode**: Siempre habilitado
2. **No usar `any`**: Preferir tipos explícitos o `unknown`
3. **Nombres descriptivos**: Variables, funciones y clases con nombres claros
4. **Single Responsibility**: Cada clase/función tiene una única responsabilidad
5. **DRY Principle**: No repetir código, extraer a funciones/servicios compartidos

### Backend (NestJS) Guidelines

#### Module Organization
```typescript
// Estructura típica de un feature module
feature-name/
├── feature-name.module.ts
├── domain/
│   ├── entities/           # Domain entities (business logic)
│   ├── models/             # Value objects, enums
│   └── repositories/       # Repository interfaces (ports)
├── application/
│   ├── dto/                # Data Transfer Objects
│   └── use-cases/          # Business use cases (services)
├── infrastructure/
│   ├── persistence/        # Repository implementations (adapters)
│   └── services/           # External service integrations
└── presentation/
    └── controllers/        # HTTP/REST controllers
```

#### Dependency Injection
```typescript
// ✅ Correcto: Inyección por constructor
@Injectable()
export class TransactionUseCase {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly assetRepo: AssetRepository,
  ) {}
}

// ❌ Evitar: Property injection sin justificación
```

#### DTOs con Validation
```typescript
// Siempre usar class-validator y class-transformer
import { IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDateString()
  transactionDate: string;

  @IsNotEmpty()
  ticker: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @Min(0.01)
  quantity: number;
}
```

#### Repository Pattern
```typescript
// Domain layer: Interface (port)
export interface TransactionRepository {
  create(data: CreateTransactionData): Promise<Transaction>;
  findByUserId(userId: string): Promise<Transaction[]>;
  findByTicker(ticker: string): Promise<Transaction[]>;
}

// Infrastructure layer: Implementation (adapter)
@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prisma: PrismaService) {}
  
  async create(data: CreateTransactionData): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }
}
```

#### Error Handling
```typescript
// Usar excepciones específicas de NestJS
import { BadRequestException, NotFoundException } from '@nestjs/common';

if (!asset) {
  throw new NotFoundException(`Asset with ticker ${ticker} not found`);
}

if (quantity <= 0) {
  throw new BadRequestException('Quantity must be positive');
}
```

### Frontend (Angular 21) Guidelines

**IMPORTANTE**: Siempre consulta el MCP de Angular para best practices actualizadas:
- `mcp_angular-cli_get_best_practices` - Obtener guía de mejores prácticas
- `mcp_angular-cli_find_examples` - Buscar ejemplos de código modernos
- `mcp_angular-cli_search_documentation` - Buscar en documentación oficial

#### Variable Scope & Access Modifiers
```typescript
// ✅ Correcto: Aplicar readonly con signals
export class MyComponent {
  // Protected readonly: Usadas en template
  protected readonly userId = input.required<string>();
  protected readonly transactions = signal<Transaction[]>([]);
  protected readonly loading = signal(false);
  protected readonly totalInvested = computed(() => 
    this.transactions().reduce((sum, t) => sum + t.totalUsd, 0)
  );
  
  // Public readonly: API pública del componente
  public readonly transactionSelected = output<Transaction>();
  
  // Private: Lógica interna
  private readonly apiService = inject(TransactionService);
  private readonly destroyRef = inject(DestroyRef);
}

// ❌ Evitar: Sin modificadores de acceso o sin readonly en signals
export class MyComponent {
  transactions = signal<Transaction[]>([]);  // Falta protected/private y readonly
  loading = signal(false);                   // Falta protected/private y readonly
}
```

#### Component Structure
```typescript
import { Component, signal, computed, input, output, inject, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  imports: [JsonPipe, DatePipe],  // Standalone imports (no especificar standalone: true)
  changeDetection: ChangeDetectionStrategy.OnPush,  // ✅ Siempre usar OnPush
  template: `
    @if (loading()) {
      <p>Loading transactions...</p>
    } @else {
      @for (transaction of transactions(); track transaction.id) {
        <div class="transaction-item">
          {{ transaction.ticker }} - {{ transaction.quantity }}
        </div>
      } @empty {
        <p>No transactions found</p>
      }
    }
  `,
})
export class TransactionList {
  // Signal inputs (usar input() en lugar de @Input) - protected readonly
  protected readonly userId = input.required<string>();
  
  // Signal outputs (usar output() en lugar de @Output) - public readonly
  public readonly transactionSelected = output<Transaction>();
  
  // State management con signals - protected readonly para template
  protected readonly transactions = signal<Transaction[]>([]);
  protected readonly loading = signal(false);
  
  // Computed signals - protected readonly para template
  protected readonly totalInvested = computed(() => 
    this.transactions().reduce((sum, t) => sum + t.totalUsd, 0)
  );
  
  // Services - private readonly (usar inject() en lugar de constructor)
  private readonly transactionService = inject(TransactionService);
}
```

#### Built-in Control Flow
```typescript
// ✅ Usar @if, @for, @switch (sintaxis nativa de Angular 21)
@if (user()) {
  <p>Welcome {{ user().name }}</p>
} @else {
  <p>Please log in</p>
}

@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p>No items</p>
}

@switch (status()) {
  @case ('loading') { <spinner /> }
  @case ('success') { <content /> }
  @case ('error') { <error-message /> }
}

// ❌ Evitar: *ngIf, *ngFor, *ngSwitch (sintaxis antigua)
```

#### Services con Signals
```typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // Dependencies - private readonly
  private readonly http = inject(HttpClient);
  
  // State signals - private readonly (internal state)
  private readonly portfolioData = signal<Portfolio | null>(null);
  
  // Public API - public readonly
  public readonly totalValue = computed(() => {
    const data = this.portfolioData();
    return data ? data.usdVariable + data.usdFixed + data.arsFixed : 0;
  });
  
  // Convertir Observable a Signal - public readonly
  public readonly currentUser = toSignal(this.http.get<User>('/api/user'));
  
  // Public methods
  async loadPortfolio(userId: string): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<Portfolio>(`/api/portfolio/${userId}`)
    );
    this.portfolioData.set(data);
  }
}
```

#### Typed Reactive Forms (Estándar Recomendado)
```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';

interface TransactionForm {
  ticker: FormControl<string>;
  quantity: FormControl<number>;
  pricePerShareArs: FormControl<number>;
  transactionDate: FormControl<Date>;
}

@Component({
  selector: 'app-transaction-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class TransactionFormComponent {
  // Form builder - private readonly
  private readonly fb = inject(NonNullableFormBuilder);
  
  // Form - protected readonly para uso en template
  protected readonly form = this.fb.group<TransactionForm>({
    ticker: this.fb.control('', { validators: [Validators.required] }),
    quantity: this.fb.control(0, { validators: [Validators.min(0.01)] }),
    pricePerShareArs: this.fb.control(0),
    transactionDate: this.fb.control(new Date()),
  });
  
  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue(); // tipo inferido correctamente
      // Submit logic
    }
  }
}
```

#### Signal model() para Two-Way Binding
```typescript
import { Component, model, ChangeDetectionStrategy } from '@angular/core';

// ✅ Usar model() para two-way binding (alternativa moderna a [(ngModel)])
@Component({
  selector: 'app-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input [value]="searchQuery()" (input)="searchQuery.set($event.target.value)" />
  `,
})
export class SearchInputComponent {
  // model() crea un signal writable que se puede usar como input/output
  public readonly searchQuery = model<string>(''); // ModelSignal<string>
}

// Uso en componente padre:
// <app-search-input [(searchQuery)]="parentQuery" />
```

---

## 🗄️ Database Schema & Domain

### Key Entities

#### Asset
- Representa activos transaccionables (CEDEARS, acciones, crypto)
- **Campos clave**:
  - `ticker`: Símbolo único (ej: "AAPL", "BTC")
  - `type`: AssetType enum (CEDEARS, ACTION, SHARE, CRYPTO, FIAT)
  - `ratioDiv`: Ratio CEDEAR (10 = 10 CEDEARs por 1 acción USA)

#### Transaction
- Registro de compras/ventas de activos
- **Campos clave**:
  - `quantity`: Cantidad de unidades
  - `pricePerShareArs`: Precio unitario en ARS
  - `usdArsRate`: Tipo de cambio USD/ARS en el momento
  - `totalUsd`: Inversión total en USD
  - `ratio`: Ratio CEDEAR aplicado a esta transacción
  - `type`: TransactionType (BUY, SELL, SPLIT, DIVIDEND)

### Important Calculations

#### Dollar Cost Average (DCA)
```typescript
// DCA = Total invertido / Cantidad total
const dca = totalInvestedUsd / totalQuantity;
```

#### Current Valuation with CEDEAR Adjustment
```typescript
// Valor actual = Cantidad × Precio actual × (1 / Ratio CEDEAR)
// Ejemplo: 100 CEDEARs × $200 USD × (1/10) = $2,000 USD
const currentValue = quantity * currentPriceUsd * (1 / cedearRatio);
```

#### Profit/Loss & Yield
```typescript
const profitLoss = currentValue - totalInvested;
const yieldPercentage = (profitLoss / totalInvested) * 100;
```

#### Fixed Deposit Accrued Interest
```typescript
const daysElapsed = differenceInDays(today, depositDate);
const dailyRate = annualYieldPercentage / 365;
const accruedInterest = principal * dailyRate * daysElapsed;
const currentValue = principal + accruedInterest;
```

---

## 🚀 Development Workflow

### Starting the Project
```bash
# Backend (API)
nx serve investment-tracker-api

# Frontend (Web)
nx serve investment-tracker-web

# Database operations
cd apps/investment-tracker-api
npx**Consultar MCP de Angular** para best practices actualizadas
2. Create standalone component with signals
3. Apply correct variable scope modifiers (public/protected/private readonly)
4. Use built-in control flow (`@if`, `@for`, `@switch`)
5. Implement service with signal-based state
6. **Prefer Signal Forms** over Reactive Forms
7. Ensure zoneless compatibility (no ChangeDetectionStrategy)
8. Write component tests with Jest
9 Run all tests
nx test investment-tracker-api
nx test investment-tracker-web

# E2E tests
nx e2e investment-tracker-api-e2e

# Affected tests only
nx affected:test
```

### Code Generation
```bash
# Generate NestJS resource
nx g @nx/nest:resource <name> --project=investment-tracker-api

# Generate Angular component
nx g @nx/angular:component <name> --project=investment-tracker-web
```

---

## 📝 Feature Development Guidelines
**Implementar Signal Forms como estándar principal**
- Usar control flow nativo en lugar de directivas
- Implementar signal inputs/outputs
- Aplicar convenciones de scope (public/protected/private readonly)
- Utilizar MCP de Angular para consultar best practice
- [x] Prisma schema con Assets y Transactions
- [x] Database module con PrismaService
- [x] Assets module (core layer)
- [ ] Transactions CRUD completo
- [ ] Portfolio calculation service
- [ ] Dashboard global con 3 categorías
- [ ] Vista individual por asset

### Phase 2: Crypto & Fixed-term (Futuro)
- [ ] Crypto holdings tracking
- [ ] Stablecoin yield management
- [ ] Fixed-term deposits calculator

### When Adding New Features

#### Backend Checklist
1. Define domain entities and interfaces in `domain/`
2. Create DTOs in `application/dto/`
3. Implement use cases in `application/use-cases/`
4. Create repository interface in `domain/repositories/`
5. Implement repository in `infrastructure/persistence/`
6. Create controller in `presentation/controllers/`
7. Wire everything in feature module
8. Write unit tests for use cases
9. Write e2e tests for critical endpoints

#### Frontend Checklist
1. **Consultar MCP de Angular** para best practices actualizadas
2. Create standalone component (no especificar `standalone: true`, es default)
3. Set `changeDetection: ChangeDetectionStrategy.OnPush`
4. Use `input()`, `output()`, `model()` instead of decorators
5. Use `inject()` instead of constructor injection
6. Apply correct variable scope modifiers (public/protected/private readonly)
7. Use built-in control flow (`@if`, `@for`, `@switch`)
8. Implement signal-based state management
9. **Use Typed Reactive Forms** for complex forms
10. Write component tests with Jest
11. Integrate with backend API

---

## 🎓 Learning Goals

### Nx Monorepo
- Comprender estructura de workspace y projects
- Dominar generators y executors
- Aplicar module boundaries con ESLint
- Optimizar builds con affected commands

### Backend (NestJS)
- Implementar Clean Architecture en backend
- Dominar dependency injection
- Gestionar database con Prisma migrations
- Implementar repository pattern correctamente
- Manejar validaciones con class-validator
- Crear APIs RESTful siguiendo convenciones

### Frontend (Angular 21)
- Usar ChangeDetectionStrategy.OnPush en todos los componentes
- Dominar Signals API para state management
- **Usar Typed Reactive Forms como estándar**
- Usar control flow nativo (`@if`, `@for`, `@switch`) en lugar de directivas estructurales
- Usar `input()`, `output()`, `model()` en lugar de decorators
- Usar `inject()` en lugar de constructor injection
- Aplicar convenciones de scope (public/protected/private readonly)
- Consultar MCP de Angular para best practices actualizadas

---

## 🔒 Security & Environment

### Environment Variables (.env)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/investment_tracker"
PORT=3000
NODE_ENV=development
```

### Credentials (config/credentials.json)
- **NO commitear** credentials reales
- Usar `credentials.example.json` como template
- Incluir en `.gitignore`

---

## 💡 AI Assistance Policy

### ✅ Use AI For:
- Generar documentación de requirements
- Crear user stories y tasks
- Sugerencias de best practices y arquitectura
- Revisar código para mejoras
- Explicar conceptos de Nx, NestJS, Angular 21

### ❌ Avoid AI For:
- Escribir código productivo directamente (yo programo)
- Tomar decisiones arquitectónicas sin mi aprobación
- Generar tests completos sin mi revisión

---

## 📚 External APIs (Futuro)

### Market Data
- Buscar API gratuita para precios de CEDEARS y acciones USA
- API para tipo de cambio ARS/USD en tiempo real

### Integration Points
- `infrastructure/services/`: External API clients
- Cache para evitar rate limits
- Fallback a datos manuales si API falla

---

## 🎯 Current Priority Tasks

1. **Backend**: Completar CRUD de Transactions con validaciones
2. **Backend**: Implementar Portfolio calculation service
3. **Frontend**: Crear dashboard con resumen global (3 categorías)
4. **Integration**: Conectar frontend con API backend
5. **Documentation**: Mantener README actualizado con avances

---

**Last Updated**: December 27, 2025
**Developer**: Martin Araujo (martin.araujo.dev@gmail.com)
