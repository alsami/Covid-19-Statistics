import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { RETRIES } from '@covid19-statistics/core/core.constants';
import { Observable } from 'rxjs';
import { delay, filter, last, retryWhen, take, tap } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private retries = 0;

  public constructor(private snackbar: MatSnackBar) {}

  public intercept(
    request: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.retries = 0;

    return httpHandler.handle(request).pipe(
      tap(null, () => {
        this.retries++;

        if (this.retries === RETRIES) {
          setTimeout(() => {
            this.showSnackbar();
          }, 1000);
        }
      }),
      filter((e) => e.type !== 0),
      retryWhen((errors) => errors.pipe(delay(2000), take(5))),
      last()
    );
  }

  private showSnackbar(): void {
    this.snackbar.open('Failed to fetch data. Please try again!', null, {
      duration: 2500,
    });
  }
}
