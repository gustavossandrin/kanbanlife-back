import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { PrismaService } from '../../../persistence/prisma/prisma.service';
import { LabelRepositoryPrisma } from '../../../persistence/prisma/repositories/label-repository-prisma';

@Module({
  controllers: [LabelController],
  providers: [
    LabelService,
    PrismaService,
    {
      provide: 'ILabelRepository',
      useClass: LabelRepositoryPrisma,
    },
  ],
  exports: [LabelService],
})
export class LabelModule {} 