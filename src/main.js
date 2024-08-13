import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.use(bodyParser.json());
  await app
    .listen(port)
    .then(() => console.log('server is running on port ' + port));
}
bootstrap();
