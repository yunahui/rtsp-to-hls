import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import path from 'path';
import { AppController } from './app.controller';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'hls'),
      serveRoot: '/stream',
      serveStaticOptions: {
        index: false,
      },
    }),
    StreamModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
