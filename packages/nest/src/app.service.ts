import { Injectable } from '@nestjs/common';
import { getSum } from '@packages/shared'

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${getSum}`;
  }
}