import { formatRelative, subDays } from 'date-fns';

export const SHARED_ID = 'shared-id';

export const getCurrentTime = (): string => {
  return formatRelative(subDays(new Date(), 1), new Date());
};
