import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { HttpFirebaseService } from '../http/http.firebase.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AvatarService {

  avatarImg64Sub = new Subject<string>();
  avatarImg256Sub = new Subject<string>();

  constructor(private authService: AuthService,
              private httpFirebaseService: HttpFirebaseService,
              private afStorage: AngularFireStorage) {}

  uploadAvatar(avatar256: Blob, avatar64: Blob) {
    this.uploadAvatar256(avatar256);
    this.uploadAvatar64(avatar64);
  }

  getAvatarPath_64(): string {
    let avatarDownloadTokens = '';
    this.getAvatarDownloadToken().then(
      response => {
        avatarDownloadTokens = response;
      }
    );

    const img64Path = environment.firebaseStorage.protocol +
      environment.firebaseStorage.url +
      environment.firebaseConfig.storageBucket +
      environment.avatar.urlSufix +
      environment.avatar.fileNameDownloadPrefix64 +
      this.authService.getUserUid() +
      '?alt=media&token=' +
      avatarDownloadTokens;

    return img64Path;
  }

  getAvatarPath_256(): string {
    let avatarDownloadTokens = '';
    this.getAvatarDownloadToken().then(
      response => {
        avatarDownloadTokens = response;
      }
    );

    return environment.firebaseStorage.protocol +
      environment.firebaseStorage.url +
      environment.firebaseConfig.storageBucket +
      environment.avatar.urlSufix +
      environment.avatar.fileNameDownloadPrefix256 +
      this.authService.getUserUid() +
      '?alt=media&token=' +
      avatarDownloadTokens;
  }

  private async getAvatarDownloadToken(): Promise<string> {
    let avatarDownloadTokens = '';
    await this.httpFirebaseService.sendAvatarDownloadToken().then(
      avatarDownloadTokensResp => {
        avatarDownloadTokens = avatarDownloadTokensResp;
      }
    );
    return avatarDownloadTokens;
  }

  private uploadAvatar256(avatar: Blob) {
    const avatarReference = this.afStorage.ref(environment.avatar.fileNameUploadPrefix256 + this.authService.getUserUid());
    const uploadTask = avatarReference.put(avatar);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        const avatarUrlObservable = avatarReference.getDownloadURL();

        avatarUrlObservable.subscribe(
          url => {
            this.avatarImg256Sub.next(url);
          }
        );
      })
    ).subscribe();
  }

  private uploadAvatar64(avatar: Blob) {
    const avatarReference = this.afStorage.ref(environment.avatar.fileNameUploadPrefix64 + this.authService.getUserUid());
    const uploadTask = avatarReference.put(avatar);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        const avatarUrlObservable = avatarReference.getDownloadURL();

        avatarUrlObservable.subscribe(
          url => {
            this.avatarImg64Sub.next(url);
          }
        );
      })
    ).subscribe();
  }
}
