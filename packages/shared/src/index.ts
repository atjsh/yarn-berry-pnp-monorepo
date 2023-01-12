import { sum } from 'lodash';

export function getSum(numbers: number[]) {
  return sum(numbers) + 2;
}
