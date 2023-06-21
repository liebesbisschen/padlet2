import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    //aktueller Request + Token und anschließend weiterreichen
    request = request.clone({
      //setzt Bearer Token in HttpHeader
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });

    return next.handle(request);

  }
}
