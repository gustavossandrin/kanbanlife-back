import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { ColumnRepositoryPrisma } from '../../../persistence/prisma/repositories/column-repository-prisma';

@Module({
  controllers: [ColumnController],
  providers: [
    PrismaService,
    {
      provide: 'IColumnRepository',
      useClass: ColumnRepositoryPrisma,
    },
  ],
  exports: [],
})
export class ColumnModule {} 