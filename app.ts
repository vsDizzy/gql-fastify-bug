import { NestFactory, AbstractHttpAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ExpressAdapter } from '@nestjs/platform-express';
import fetch from 'node-fetch';

run();

async function run() {
  await test(new ExpressAdapter());
  await test(new FastifyAdapter());
}

async function test(adapter: AbstractHttpAdapter) {
  const app = await NestFactory.create(AppModule, adapter);
  await app.listen(3000);

  console.log(adapter.constructor.name);
  await call('/graphql');
  await call('/ee');

  await app.close();
}

async function call(endpoint: string) {
  const { status, statusText } = await fetch(
    'http://localhost:3000' + endpoint,
    {
      headers: { Accept: 'text/html' }
    }
  );
  console.log(endpoint, status, statusText);
}
