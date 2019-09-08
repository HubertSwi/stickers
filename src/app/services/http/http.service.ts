import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { StickersActions, UsersActions } from './action.enum';
import { LoggingService } from '../utils/logging.service';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient,
              private loggingService: LoggingService,
              ) {}

  sendRequest(actionName: StickersActions | UsersActions, query = '', body = null): Observable<Object> {
    const action = environment.actions[actionName];
    const url =
      environment.protocol +
      environment.domain +
      action.service +
      action.url +
      query;

    this.loggingService.info('Request send; URL: ', url);

    switch (action.method) {
      case 'GET':
        return this.httpClient.get(url);
      case 'POST':
        return this.httpClient.post(url, body);
      case 'PUT':
        return this.httpClient.put(url, body);
      case 'DELETE':
        return this.httpClient.delete(url);
      case 'OPTIONS':
        return this.httpClient.get(url);
      default:
    }
  }
}
