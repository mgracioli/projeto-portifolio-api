//  modulo para exportar o prisma.service para outros módulos

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Facilita o uso em toda a aplicação
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // exporta para todos os outros módulos, para usarem esse módulo, eles precisam importar esse modulo no módulo deles via @Module({ imports:[]...})
})
export class PrismaModule {}