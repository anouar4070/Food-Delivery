import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);

  // Serve static assets (e.g., images, CSS, JS) from the "public" folder
  // Example: http://localhost:4001/logo.png if logo.png is in /public
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // Set the base directory for view templates (used for rendering emails, etc.)
  // Here, all EJS templates will be loaded from /servers/email-templates
  app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'));
  app.setViewEngine('ejs');

  // app.enableCors({
  //   origin: '*',
  // });

  await app.listen(process.env.port ?? 4001);
}
bootstrap();
