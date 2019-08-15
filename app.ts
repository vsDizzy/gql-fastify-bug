import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

run();

async function run() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('ok');
}
