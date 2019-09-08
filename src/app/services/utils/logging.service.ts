import { Injectable} from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class LoggingService {

  info(message?: any, ...optionalParams: any[]): void {
    if (environment.loggingLevel >= 2) {
      console.log(message, optionalParams);
    }
  }

  warn(message?: any, ...optionalParams: any[]): void {
    if (environment.loggingLevel >= 1) {
      console.log(message, optionalParams);
    }
  }
}
