import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './utils/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('Internship API')
  .setDescription('This is API documentation for internship management system')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document)


  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist:true,
  //     transform:true,
  //     forbidNonWhitelisted:true
  //   })
  // )
  app.useGlobalFilters(new HttpExceptionFilter)
  app.useGlobalInterceptors(new TransformInterceptor)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
