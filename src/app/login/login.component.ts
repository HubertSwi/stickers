import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  wrongCredentials: boolean;

  constructor(private authService: AuthService) {
    authService.wrongCredentialsSub.subscribe( (value: boolean) => {
      this.wrongCredentials = value;
    });
  }

  onLogin(form: NgForm) {
    this.authService.loginUser(form.value.login_email, form.value.login_password);
  }
}
