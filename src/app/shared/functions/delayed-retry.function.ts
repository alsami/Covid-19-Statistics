import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { delay, last, retryWhen, take } from 'rxjs/operators';

export function retryHandler<T>(
  retry: number = 5,
  throttle: number = 1000
): MonoTypeOperatorFunction<T> {
  return pipe(
    retryWhen(errors => errors.pipe(delay(throttle), take(retry))),
    last()
  );
}
