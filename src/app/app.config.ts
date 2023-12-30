import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import { routes } from './app.routes';
import { RowDetailService } from 'src/app/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationHandlerComponent} from './notification-handler/notification-handler.component';
import { AuthGuard } from './auth.guard';
import { RoleHandlerComponent } from './role-handler/role-handler.component';


export function tokenGetter(){
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {

  providers: [
    [AuthGuard],
    importProvidersFrom(
      JwtModule.forRoot({
        config:{
          tokenGetter: tokenGetter,
        },
      })
    ), 
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    RowDetailService,
    MatSnackBar,
    NotificationHandlerComponent,
    RoleHandlerComponent
],
};
