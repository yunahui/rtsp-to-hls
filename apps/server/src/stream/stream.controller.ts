import { Controller, Get, Logger, Param, Post, Body } from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('streams')
export class StreamController {
  private readonly logger: Logger = new Logger('StreamController');
  constructor(private readonly streams: StreamService) {}

  @Get(':id/health')
  getStreamHealth(@Param('id') id: string) {
    return this.streams.healthCheck(id);
  }

  @Post()
  createStream(@Body('url') url: string) {
    this.logger.log(`Creating stream with URL: ${url}`);
    return this.streams.create(url);
  }
}
