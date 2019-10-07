import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no intercaptor");
        return next.handle(req).pipe(
            catchError(error => {
                let errorObj = error;

                if(errorObj.error){
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                /*
                switch (error.status) {
                    case 403: console.log("AQUI");
                        break;
                }
                */
               console.log("Erro detectado pelo interceptor:")
               console.log(errorObj);

                return throwError(errorObj);
            })) as any;
    }


}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};