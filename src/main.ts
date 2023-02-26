import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app.module';
import { LogerType } from './types/log.type';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  if (process.env.NODE_ENV !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('API Specs')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });
    app.use(helmet({ contentSecurityPolicy: false }));
  } else {
    app.use(helmet());
  }

  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  Logger.log(`Application running on ${await app.getUrl()}`, LogerType.DEV);
  Logger.log(`API Docs running on ${await app.getUrl()}/docs`, LogerType.DEV);
}
bootstrap();
