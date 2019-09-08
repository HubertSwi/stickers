import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { HttpService } from './http.service';
import { User } from '../../models/user.model';
import { UsersActions } from './action.enum';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../utils/logging.service';

@Injectable()
export class HttpUsersService {

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private loggingService: LoggingService,
              ) {}

  sendFetchUser(): Observable<User> {
    const userSub = new Subject<User>();

    this.httpService.sendRequest(UsersActions.fetchUser, `?uid=${this.authService.getUserUid()}`).subscribe(
      usr => {
        userSub.next(usr[0]);
      }
    );

    return userSub.asObservable();
  }

  sendSaveUser(user: User): void {
    this.httpService.sendRequest(UsersActions.saveUser, '', user).subscribe(
      (response) => {
        this.loggingService.info('sendSaveUser: OK; Response: ', response);
      },
      (error) => {
        this.loggingService.warn('sendSaveUser: Error; Response: ', error);
      }
    );
  }
}
