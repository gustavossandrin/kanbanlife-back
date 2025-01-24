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