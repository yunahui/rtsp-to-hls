import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getDefault() {
    return 'default';
  }

  @Get('hello')
  getHello() {
    return 'hello';
  }
}
