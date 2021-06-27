import { Auth } from '@aws-amplify/auth';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    return from(
      Auth.currentAuthenticatedUser({
        bypassCache: false,
      })
    ).pipe(
      switchMap((user) => {
        const requestClone = req.clone({
          setHeaders: {
            Authorization: user.signInUserSession.idToken.jwtToken
          },
        });
        return next.handle(requestClone);
      })
    );
  }
}
