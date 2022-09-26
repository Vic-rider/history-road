import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: AuthComponent,
          children: [
            {
              path: '',
              redirectTo: 'login',
              pathMatch: 'full'
            },
            {
              path: 'login',
              component: LoginComponent
            },
            {
              path: 'register',
              component: RegisterComponent
            },
            {
              path: 'forgot-password',
              component: ForgotPasswordComponent
            },
            {
              path: 'check-account/:token',
              component: ConfirmAccountComponent
            }
          ]
        },
        {
          path: '**',
          redirectTo: '',
          pathMatch: 'full'
        }
      ]
    )
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmAccountComponent
  ]
})
export class AuthModule { }
