import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log('');
  console.log(`[SERVER] Backend running on http://localhost:${port}`);
  console.log(`[SERVER] GraphQL Playground: http://localhost:${port}/graphql`);
  console.log('');
}
bootstrap();
