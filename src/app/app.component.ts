import { Component, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SessionService } from './services/session/session.service';
import { AuthService } from './services/auth/auth.service';
import { LoggingService } from './services/utils/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(db: AngularFirestore,
              private sessionService: SessionService,
              private authService: AuthService,
              private loggingService: LoggingService,
  ) {
    this.sessionService.setTimeout();
    this.sessionService.userInactive.subscribe(() => {
      this.loggingService.info('You have been inactive for too long');
      if (this.authService.isUserLogged()) {
        this.authService.logoutUser();
      }
    });
  }

  @HostListener('window:mousemove')
  refreshUserState() {
    clearTimeout(this.sessionService.userActivity);
    this.sessionService.setTimeout();
  }
}
