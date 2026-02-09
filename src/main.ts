import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });

  // Swagger/OpenAPI Configuration
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

  // Write swagger.json file in development
  if (process.env.NODE_ENV !== 'production') {
    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  }

  // Serve API documentation at /api/docs
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'MyFitnessFood API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const PORT = process.env.PORT ?? 3000;
  app.enableCors();
  await app.listen(PORT);
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
  console.log(`📚 API Docs available at: http://localhost:${PORT}/api/docs`);
  console.log(`📄 OpenAPI JSON at: http://localhost:${PORT}/api/docs-json`);
}
bootstrap().catch((err) => {
  fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});
