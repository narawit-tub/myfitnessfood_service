import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // Hello world
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
