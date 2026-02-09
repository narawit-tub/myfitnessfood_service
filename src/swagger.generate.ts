import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('MyFitnessFood API')
    .setDescription(
      'Backend API for fitness nutrition tracking with AI-powered suggestions. ' +
        'Track meals, set nutrition goals, and get personalized recommendations.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token (obtained from /auth/login)',
        in: 'header',
      },
      'BearerAuth',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addTag('Meal Records', 'Meal tracking and nutrition logging')
    .addTag('Intake Goals', 'Daily nutrition goals management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  console.log('swagger.json generated successfully');
  await app.close();
  process.exit(0);
}

generateSwagger();
