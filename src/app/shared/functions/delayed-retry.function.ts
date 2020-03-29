import { RETRIES } from '@covid19/core/core.constants';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { delay, last, retryWhen, take } from 'rxjs/operators';

export function retryHandler<T>(
  throttle: number = 1000
): MonoTypeOperatorFunction<T> {
  return pipe(
    retryWhen(errors => errors.pipe(delay(throttle), take(RETRIES))),
    last()
  );
}
