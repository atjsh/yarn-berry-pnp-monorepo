import { Injectable } from '@nestjs/common';
import { SHARED_ID, getCurrentTime } from '@packages/shared-data';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello ${SHARED_ID}! this is ${getCurrentTime()}.`;
  }
}
