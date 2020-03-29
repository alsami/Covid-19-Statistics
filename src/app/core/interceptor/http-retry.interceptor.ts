import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, last, retryWhen, take } from 'rxjs/operators';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const nextRequest = request.clone();

    return httpHandler.handle(nextRequest).pipe(
      retryWhen(errors => errors.pipe(delay(1000), take(5))),
      last()
    );
  }
}
