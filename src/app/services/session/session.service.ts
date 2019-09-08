import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment.base';

export class SessionService {

  userActivity;
  userInactive: Subject<any> = new Subject();

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), +environment.expirationTime);
  }
}
