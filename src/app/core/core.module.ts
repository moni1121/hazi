import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { AuthService } from './services/auth.service';
import { Auth } from './auth/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    Auth,
    AuthService,
    AlertService,
    UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class CoreModule { }
