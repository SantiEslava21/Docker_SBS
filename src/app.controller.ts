import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../package.json';

@Controller()
export class AppController {
  @Get('version')
  getVersion() {
    return {
      version: packageJson.version,
    };
  }
}
