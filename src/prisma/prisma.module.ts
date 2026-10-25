//  modulo para exportar o prisma.service para outros módulos

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Facilita o uso em toda a aplicação, assim não precisa importar esse módulo/provider em outros módulos para usá-lo
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // exporta para todos os outros módulos, como está usando o @Global, os outros módulos não precisam importar esse aqui para poderem injetar esse service
})
export class PrismaModule {}