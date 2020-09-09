import { RETRIES } from '@covid19-statistics/core/core.constants';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { delay, last, retryWhen, take } from 'rxjs/operators';

export function delayRetryHandler<T>(
  throttle: number = 1000
): MonoTypeOperatorFunction<T> {
  return pipe(
    retryWhen((errors) => errors.pipe(delay(throttle), take(RETRIES))),
    last()
  );
}
