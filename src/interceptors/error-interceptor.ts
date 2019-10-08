import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService,
        private alertController: AlertController
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                switch (errorObj.status) {

                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    default:
                        this.handleDefaultError(errorObj);
                        break;

                }

                console.log("Erro detectado pelo interceptor:")
                console.log(errorObj);

                return throwError(errorObj);
            })) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async handle401() {
        const alert = await this.alertController.create({
            header: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        await alert.present();
    }

    async handleDefaultError(errorObj) {
        const alert = await this.alertController.create({
            header: `Erro ${errorObj.status}: ${errorObj.error}`,
            message: `${errorObj.message}`,
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        await alert.present();
    }
}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};