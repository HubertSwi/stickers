import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth/auth.service';
import { HttpUsersService } from '../services/http/http.users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private _passRepNotMatch: boolean;
  private isRegistrationStarted = false;

  private wrongFirebaseEmailAuth = false;

  get passRepNotMatch(): boolean {
    return this._passRepNotMatch;
  }

  constructor(private authService: AuthService,
              private httpUsersService: HttpUsersService,
              ) {}

  onRegister(form: NgForm) {
    this.isRegistrationStarted = true;

    const firstNameForm = form.value.reg_first_name;
    const lastNameForm = form.value.reg_last_name;
    const emailForm = form.value.reg_email;
    const passwordForm = form.value.reg_password;
    const passwordRepForm = form.value.reg_rep_password;

    if (passwordForm !== passwordRepForm) {
      this._passRepNotMatch = true;
    }

    this.authService.createUser(emailForm, passwordForm).subscribe(
      userUid => {
        const usr = new User(
          null,
          userUid,
          firstNameForm,
          lastNameForm,
          emailForm,
          null);

        this.httpUsersService.sendSaveUser(usr);
        this.authService.loginUser(emailForm, passwordForm);
        this.isRegistrationStarted = false;
        this.wrongFirebaseEmailAuth = false;
      },
      () => {
        this.isRegistrationStarted = false;
        this.wrongFirebaseEmailAuth = true;
      }
    );
  }
}
