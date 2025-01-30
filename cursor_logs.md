[VERIFICAÇÃO] Repositório ColumnRepositoryPrisma verificado e confirmado sem erros, alinhado com schema.prisma 
[CORREÇÃO] Ajustado método create do LabelRepositoryPrisma para mapear corretamente relacionamento many-to-many com Tasks 
[CORREÇÃO] Ajustado método update do LabelRepositoryPrisma para mapear corretamente relacionamento many-to-many com Tasks 
[CORREÇÃO] Ajustado método create do ColumnRepositoryPrisma para mapear corretamente relacionamento com Project 

## Alterações de Estrutura - DTOs
- Reorganização dos DTOs para pasta shared/inputs/{module}
- Renomeação dos arquivos de DTO para seguir o padrão input/output
- Atualização das referências nos controllers
- Novo padrão: src/infra/http/shared/inputs/{module}/*.input.ts

## Reorganização de DTOs - Todos os Módulos
- Movidos todos os DTOs para src/infra/http/shared/inputs/{module}
- Renomeados para seguir o padrão *.input.ts
- Módulos atualizados: project, task, label, column, user
- Mantida a mesma estrutura e validações dos DTOs originais

## Atualização de Controllers - DTOs para Inputs
- Atualizados imports em todos os controllers para usar os novos inputs
- Módulos atualizados: task, label, column, user
- Removidas referências antigas aos DTOs
- Mantida a mesma funcionalidade com nova estrutura

## Correção de Decorators - Inputs
- Ajustados decorators em todos os inputs para resolver erros de linter
- Adicionadas mensagens de validação em português
- Melhorada a validação de UUIDs para versão 4
- Adicionados parâmetros específicos para cada tipo de validação

#importante
- DTOs agora seguem o padrão de inputs/outputs em shared/inputs/{module}
- Necessário atualizar as referências nos controllers de cada módulo
- Controllers atualizados para usar os novos inputs
- Inputs agora possuem mensagens de validação em português

[24/01/2024] Tentativa de rodar o projeto falhou devido a DTOs faltantes (create/update para task e user) e problema na importação do UserRepository
#importante Necessário criar os DTOs faltantes e verificar a estrutura de importação do UserRepository antes de conseguir rodar o projeto

[29/01/2024] - Instalado Vercel CLI globalmente usando sudo npm install -g vercel após resolver problemas de permissão
[29/01/2024] - Corrigido importações de DTOs em todos os services (column, label, task, user) para usar os novos inputs da pasta shared/inputs
[29/01/2024] - Removido métodos findAll não existentes nas interfaces dos repositories

# Logs do Projeto

## Configuração Inicial
- Projeto requer PostgreSQL rodando via Docker e Node.js/Yarn para execução
- Stack: NestJS, Prisma, PostgreSQL

#importante
- O projeto usa PostgreSQL na porta 5432
- Credenciais do banco: usuário=postgres, senha=postgres, database=kanbanlife

# Logs de Alterações

- Corrigido nome do módulo de health de LabelModule para HealthModule
- Importado HealthModule no AppModule para habilitar o endpoint /health
- Ajustado UserRepository para implementar corretamente a interface Repository (renomeado métodos e adicionado getAll)
- Implementado mapeamento correto de dados do Prisma para entidade User no UserRepositoryPrisma
- Corrigido Register usecase para aguardar corretamente a Promise do save

# Importante
- O endpoint /health retorna 'OK' quando a aplicação está funcionando corretamente
- UserRepository agora segue o padrão da interface Repository com métodos save, getById e getAll
- Todos os métodos do UserRepositoryPrisma agora retornam instâncias válidas da entidade User

## Documentação e Padrões
- Documentado padrão de criação de entities no cursor.md, baseado na implementação do User.entity.ts
- Identificadas entities que precisam ser ajustadas: project.entity.ts, column.entity.ts, label.entity.ts, task.entity.ts

#importante
- Todas as entities devem seguir o padrão documentado em cursor.md
- Cada entity deve ter seu próprio schema usando Zod para validação
- O método validate() é obrigatório em todas as entities
- Campos base (id, createdAt, updatedAt) são obrigatórios em todas as entities

## Implementação do Padrão de Entities
- Implementada Column entity seguindo o padrão documentado (construtor, validate(), schema)
- Implementada Label entity seguindo o padrão documentado (construtor, validate(), schema)
- Implementada Task entity seguindo o padrão documentado (construtor, validate(), schema)
- Implementada Project entity seguindo o padrão documentado (construtor, validate(), schema)

#importante
- Column, Label, Task e Project entities agora seguem o mesmo padrão do User
- Todas as entities implementam validate() usando seus respectivos schemas Zod
- Todas as entities possuem os campos base (id, createdAt, updatedAt)
- Relacionamentos entre entities mantidos (Project-Column, Column-Task, Task-Label, Project-User)

## Implementação dos Repositórios Prisma
- Implementado LabelRepositoryPrisma seguindo o padrão Repository
- Implementado ColumnRepositoryPrisma com suporte a posicionamento
- Implementado TaskRepositoryPrisma com suporte a posicionamento
- Implementado ProjectRepositoryPrisma com relacionamentos

# Importante
- Padrão Repository implementado com classe abstrata base e interfaces específicas
- Cada repositório tem sua implementação Prisma correspondente
- Mapeamento entre entidades e modelo do banco feito via método mapToEntity
- Suporte a operações CRUD básicas e métodos específicos por entidade
- Relacionamentos mantidos via chaves estrangeiras (userId, columnId, etc)

## Correção dos Repositórios Domain
- Convertido repositórios de interfaces para classes abstratas
- Corrigido importação do Repository base para todos os repositórios
- Atualizado implementações Prisma para estender as classes abstratas
- Adicionado chamada super() nos construtores das implementações

# Importante
- Todos os repositórios agora seguem o mesmo padrão do UserRepository
- Repositórios base são classes abstratas que implementam Repository<T>
- Implementações Prisma estendem as classes abstratas base
- Mantida toda a funcionalidade existente com melhor tipagem e consistência