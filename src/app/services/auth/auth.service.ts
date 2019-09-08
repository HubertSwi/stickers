import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';

import { SessionService } from '../session/session.service';
import { LoggingService } from '../utils/logging.service';

@Injectable()
export class AuthService {

  wrongCredentialsSub: Subject<boolean>;

  constructor(private sessionService: SessionService,
              private router: Router,
              private loggingService: LoggingService,
              ) {
    this.wrongCredentialsSub = new Subject<boolean>();
  }

  private userEmail: string;
  private userPass: string;

  createUser(email: string, password: string): Observable<string> {
    const createdUserSub = new Subject<string>();

    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (createdUser: firebase.auth.UserCredential) => {
        this.loggingService.info('User creation was successful. UID: ', createdUser.user.uid);
        createdUserSub.next(createdUser.user.uid);
      })
      .catch(
        err => {
          this.loggingService.warn('User creation failed. Error: ', err);
        }
      );

    return createdUserSub.asObservable();
  }

  loginUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( response => {
        this.loggingService.info('Sign in user was successful. Response: ', response);
        this.userEmail = email;
        this.userPass = password;
        this.wrongCredentialsSub.next(false);
        this.setStorageUserUid();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1);
      })
      .catch( error => {
        this.loggingService.info('Sign in user failed. Error: ', error);
        this.wrongCredentialsSub.next(true);
        this.router.navigate(['/login']);
      });
  }

  logoutUser() {
    firebase.auth().signOut()
      .then( response => {
        this.loggingService.info('Logout user was successful. Response: ', response);
        this.clearStorageUserUid();
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.loggingService.warn('Logout user failed. Error: ', error);
      });
  }

  isUserLogged(): boolean {
    if (this.getStorageUserUid() != null) {
      this.loggingService.info('User is logged.');
      return true;
    } else {
      this.loggingService.info('User is not logged.');
      return false;
    }
  }

  getUserUid(): string {
    return sessionStorage.getItem('logged-user-uid');
  }

  changeUserEmail(newEmail: string): void {
    firebase.auth()
      .signInWithEmailAndPassword(this.userEmail, this.userPass)
      .then((userCredential: firebase.auth.UserCredential) => {
        userCredential.user.updateEmail(newEmail).then(() => {
          this.userEmail = newEmail;
        });
      });
  }

  private setStorageUserUid(): void {
    sessionStorage.setItem('logged-user-uid', firebase.auth().currentUser.uid);
  }

  private getStorageUserUid(): string {
    return sessionStorage.getItem('logged-user-uid');
  }

  private clearStorageUserUid(): void {
    sessionStorage.removeItem('logged-user-uid');
  }
}
