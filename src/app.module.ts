import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    PrismaModule, // Módulos globais (@Global(), como o PrismaModule) precisam ser importados uma vez no AppModule (ou em qualquer módulo que seja importado pelo AppModule). Depois disso, o PrismaService fica disponível em todos os módulos sem precisar importar o PrismaModule de novo
    TaskModule    // precisa importar o módulo aquio sempre que quiser que as rotas dos controllers sejam registradas, ou seja, que existam
  ],   
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
