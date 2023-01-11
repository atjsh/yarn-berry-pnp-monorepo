import { say } from 'cowsay';

export function getSum(numbers: number[]) {
  console.log(
    say({ text: `Hello from shared ${numbers.reduce((a, b) => a + b, 0)}` }),
  );

  return 1;
}
