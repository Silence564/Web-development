import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    'credentials':true,
    'origin': true,
    'methods': "GET, HEAD, PUT, POST, PATCH, DELETE",
    'allowedHeaders': 'rejectUnauthorized,Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
  });
  await app.listen(4000)
}
bootstrap();
