import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../utils/logging.service';

class AvatarResponse {
  name: string;
  bucket: string;
  generation: string;
  metageneration: string;
  contentType: string;
  timeCreated: string;
  updated: string;
  storageClass: string;
  size: string;
  md5Hash: string;
  contentEncoding: string;
  crc32c: string;
  etag: string;
  downloadTokens: string;
}

@Injectable()
export class HttpFirebaseService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private loggingService: LoggingService,
              ) {}

  async sendAvatarDownloadToken(): Promise<string> {
    let downloadTokens = '';
    await this.sendFirebaseRequest().then(
      avatarDetails => {
        downloadTokens = avatarDetails.downloadTokens;
      }
    ).catch(
      error => {
        this.loggingService.info('Getting avatar details error', error);
      }
    );
    return downloadTokens;
  }

  private sendFirebaseRequest(query = '', body = null): Promise<AvatarResponse> {
    const url =
      environment.firebaseStorage.protocol +
      environment.firebaseStorage.url +
      environment.firebaseConfig.storageBucket +
      environment.avatar.urlSufix +
      environment.avatar.fileNameDownloadPrefix64 +
      this.authService.getUserUid() +
      query;

    return this.httpClient.get<AvatarResponse>(url).toPromise();
  }
}
