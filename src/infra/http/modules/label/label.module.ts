import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { LabelRepositoryPrisma } from '../../../persistence/prisma/repositories/label-repository-prisma';

@Module({
  controllers: [LabelController],
  providers: [
    PrismaService,
    {
      provide: 'ILabelRepository',
      useClass: LabelRepositoryPrisma,
    },
  ],
  exports: [],
})
export class LabelModule {} 