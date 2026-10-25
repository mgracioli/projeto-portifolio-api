import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // intercepta toda requisição antes de ela chegar ao Controller. Ele usa as anotações do class-validator (que foram colocadas nos DTOs, como @IsString(), @MinLength(1)) para validar o corpo da requisição.
  // Sem ele, os DTOs são apenas classes TypeScript: o @IsString() não faz nada em runtime, e o @Body() dto: CreateTaskDto receberia qualquer objeto, sem validação. O ValidationPipe é quem ativa essas anotações
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Remove do objeto, que está chegando, qualquer propriedade que não esteja declarada no DTO.
    forbidNonWhitelisted: true, // Muda o comportamento acima: em vez de remover os campos extras, ele lança um erro 400 se o cliente enviar algo que não está no DTO
    transform: true,            // Transforma o objeto plano (JSON) na instância da classe DTO. Sem isso, o dto que chega no Controller é um objeto literal ({ title: "X" }), sem os métodos da classe. Com transform: true, o NestJS cria uma instância real de CreateTaskDto, o que é necessário para que os decorators do class-transformer (como @Type(() => Number)) funcionem, e para que o instanceof CreateTaskDto seja verdadeiro
  }));

  app.enableCors({
    origin: 'http://localhost:3000', // URL do front-end
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
