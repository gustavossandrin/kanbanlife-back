import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { ColumnRepositoryPrisma } from '../../../persistence/prisma/repositories/column-repository-prisma';

@Module({
  controllers: [ColumnController],
  providers: [
    ColumnService,
    PrismaService,
    {
      provide: 'IColumnRepository',
      useClass: ColumnRepositoryPrisma,
    },
  ],
  exports: [ColumnService],
})
export class ColumnModule {} 