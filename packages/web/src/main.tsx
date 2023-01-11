import { createRoot } from 'react-dom/client';
import { getSum } from '@packages/shared';

createRoot(document.getElementById('root') as HTMLElement).render(
  <div>{getSum([1, 2, 3, 4, 5])}</div>,
);
