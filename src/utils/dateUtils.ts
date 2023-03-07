import { format } from 'date-fns';

export function timestampFromMilliSeconds(seconds: number) {
  return format(new Date(seconds), 'dd.MM.yyyy HH:mm:ss.SSS');
}
