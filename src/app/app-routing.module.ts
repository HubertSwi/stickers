import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { CanDeactivateGuard } from './services/utils/can-deactivate-guard.service';
import { SettingsComponent } from './home/settings/settings.component';
import { LoggedGuard } from './services/auth/logged-guard.service';

const appRoutes: Routes = [
  { path: '', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: HomeComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedGuard] },
  { path: '**', redirectTo: '/register' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
