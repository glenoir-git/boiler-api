import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Your API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('api')
      .build();

  app.enableCors({
    origin: 'http://localhost:8100', // Remplacez par l'URL de votre app Ionic
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Correct path to Swagger

  await app.listen(3000);
}
bootstrap();