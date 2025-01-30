# Estrutura do Projeto e Boas Práticas

## Visão Geral da Arquitetura

O projeto segue uma arquitetura limpa (Clean Architecture) com as seguintes camadas:

```
src/
├── domain/         # Regras de negócio e entidades
├── app/           # Casos de uso da aplicação
├── infra/         # Implementações de infraestrutura
└── shared/        # Recursos compartilhados
```

## Padrões por Camada

### 1. Domain Layer (`src/domain/`)

#### Entidades (`entities/`)

- Representam os objetos de negócio
- Devem estender a classe base `Entity`
- Contêm apenas regras de negócio invariantes
- Exemplo de nomenclatura: `customer.ts`, `certificate.ts`

#### Repositórios (`repositories/`)

- Interfaces que definem contratos para persistência
- Devem estender `Repository<T>`
- Nomenclatura: `[entity-name]-repository.ts`
- Exemplo: `customer-repository.ts`

#### Schemas (`schemas/`)

- Definem a estrutura de dados das entidades
- Usados para validação
- Nomenclatura: `[entity-name]-schema.ts`

### 2. Application Layer (`src/app/`)

#### Use Cases (`usecases/`)

- Implementam a lógica de negócio
- Um caso de uso por arquivo
- Nomenclatura: `[action-name].ts`
- Exemplo: `authentication.ts`

### 3. Infrastructure Layer (`src/infra/`)

#### HTTP Modules (`http/modules/`)

- Organização por feature
- Cada módulo contém:
  - `[feature].controller.ts`
  - `[feature].module.ts`
  - `[feature].service.ts` (opcional)

##### Controllers

- Responsáveis pela interface HTTP
- Usam decorators para rotas
- Injetam use cases necessários
- Nomenclatura: `[feature].controller.ts`

##### Modules

- Configuram dependências
- Importam outros módulos necessários
- Declaram controllers e providers
- Nomenclatura: `[feature].module.ts`

#### Repositories Implementation (`persistence/`)

- Implementam as interfaces do domain
- Organizados por tecnologia (ex: prisma)
- Nomenclatura: `[entity-name]-repository-[tech].ts`

## Boas Práticas

1. **Injeção de Dependências**

   - Usar decorators `@Injectable()`
   - Definir interfaces para inversão de dependência
   - Configurar providers no módulo

2. **Tratamento de Erros**

   - Usar padrão Either para erros de domínio
   - Criar exceções específicas em `domain/errors`
   - Implementar filtros de exceção globais

3. **Validação**

   - Usar schemas para validação de dados
   - Implementar DTOs para requests
   - Validar inputs nos controllers

4. **Testes**
   - Criar testes e2e para controllers
   - Testes unitários para use cases
   - Mocks para repositórios

## Criando Novos Recursos

1. Criar entidade em `domain/entities`
2. Definir schema em `domain/schemas`
3. Criar interface do repositório em `domain/repositories`
4. Implementar casos de uso em `app/usecases`
5. Criar implementação do repositório em `infra/persistence`
6. Criar módulo HTTP com controller em `infra/http/modules`

## Convenções de Nomenclatura

- Arquivos em kebab-case
- Classes em PascalCase
- Interfaces com prefixo I (ex: ICustomerRepository)
- Métodos e variáveis em camelCase

## Estrutura de um Novo Recurso

Exemplo para criar um novo recurso "Product":

```
src/
├── domain/
│   ├── entities/
│   │   └── product.ts
│   ├── repositories/
│   │   └── product-repository.ts
│   └── schemas/
│       └── product-schema.ts
├── app/
│   └── usecases/
│       └── product/
│           ├── create-product.ts
│           ├── update-product.ts
│           └── delete-product.ts
└── infra/
    ├── http/
    │   └── modules/
    │       └── product/
    │           ├── product.controller.ts
    │           └── product.module.ts
    └── persistence/
        └── prisma/
            └── repositories/
                └── product-repository-prisma.ts
```


# O que é o projeto? 
 O Projeto é um kanban board, onde o usuário pode criar projetos, colunas e tarefas.
 Os modelos estão definidos no arquivo schema.prisma

# Padrão de Entities

## Estrutura Base

Todas as entities do sistema devem seguir o seguinte padrão:

1. Herdar da classe abstrata `Entity`
2. Implementar a interface do schema específico (ex: `UserSchema`)
3. Implementar o método `validate()`

## Componentes Necessários

### 1. Schema (src/domain/schemas/[nome]-schema.ts)
```typescript
import { z } from 'zod';

export const nomeSchema = z.object({
  // definição dos campos com suas validações
});

export type NomeSchema = z.infer<typeof nomeSchema>;
```

### 2. Entity (src/domain/entities/[nome].entity.ts)
```typescript
import { randomUUID } from 'crypto';
import Entity from '../contracts/entity';
import { nomeSchema, NomeSchema } from '../schemas/nome-schema';
import EntityError from '../errors/entity-error';

export class Nome extends Entity implements NomeSchema {
  constructor(
    // campos específicos da entidade
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {
    super();
  }

  validate() {
    const validation = nomeSchema.safeParse(this);

    if (!validation.success) {
      const fieldsErrors = validation.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};

      for (const field in fieldsErrors) {
        errors[field] = fieldsErrors[field][0];
      }

      return new EntityError('Invalid nome', errors);
    }

    Object.assign(this, validation.data);

    return null;
  }
}
```

## Observações Importantes

1. Toda entity deve ter os campos base:
   - `id`: string (UUID)
   - `createdAt`: Date
   - `updatedAt`: Date

2. O método `validate()` deve:
   - Usar o schema Zod para validação
   - Retornar `EntityError` em caso de erro
   - Retornar `null` em caso de sucesso
   - Atualizar a própria instância com os dados validados

3. O schema deve definir todas as validações necessárias usando Zod

4. A entity deve implementar a interface gerada pelo schema para garantir tipagem correta

## Exemplo de Uso

```typescript
const user = new User('João', 'Silva', 'joao@email.com', '123456');
const error = user.validate();

if (error) {
  console.error(error.message, error.errors);
} else {
  // user é válido
}
```

# Padrão de Repositório

## Estrutura Base
O projeto utiliza o padrão Repository com a seguinte estrutura:

1. **Contrato Base**: `Repository<T extends Entity>` em `src/domain/contracts/repository.ts`
   - Define operações básicas CRUD
   - Métodos: save, update, delete, getById, getAll

2. **Repositórios Abstratos**: Em `src/domain/repositories/`
   - Extendem o contrato base
   - Podem adicionar métodos específicos
   - Exemplo: `UserRepository` adiciona `findByEmail`

3. **Implementações Concretas**: Em `src/infra/persistence/repositories/`
   - Implementam os repositórios abstratos
   - Utilizam o Prisma como ORM
   - Incluem mapeamento entre entidade e modelo do banco

## Padrão de Implementação
1. Cada repositório tem sua versão abstrata em `domain/repositories`
2. Cada repositório tem sua implementação Prisma em `infra/persistence/repositories`
3. Métodos específicos são definidos na interface/classe abstrata
4. Implementação Prisma inclui:
   - Injeção do PrismaService
   - Método mapToEntity para conversão
   - Implementação dos métodos CRUD
   - Implementação dos métodos específicos

## Repositórios Disponíveis
- UserRepository
- ProjectRepository
- LabelRepository
- ColumnRepository
- TaskRepository

Cada um com suas particularidades e métodos específicos.