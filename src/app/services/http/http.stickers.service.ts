import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { AddStickerService } from '../utils/add-sticker.service';
import { StickersActions } from './action.enum';
import { Sticker } from '../../models/sticker.model';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../utils/logging.service';

@Injectable()
export class HttpStickersService {

  loadingStickersSub = new Subject<boolean>();
  errorLoadingStickersSub = new Subject<boolean>();

  constructor(private httpService: HttpService,
              private addStickerService: AddStickerService,
              private authService: AuthService,
              private loggingService: LoggingService,
              ) {}

  sendSaveSticker(sticker: Sticker): void {
    this.httpService.sendRequest(StickersActions.saveSticker, `${this.authService.getUserUid()}/stickers/${sticker.id}`, sticker).subscribe(
      (response) => {
        this.loggingService.info('sendSaveSticker: OK; Response: ', response);
      },
      (error) => {
        this.loggingService.warn('sendSaveSticker: Error; Response: ', error);
      }
    );
  }

  sendSaveStickers(stickers: Sticker[]): void {
    this.httpService.sendRequest(StickersActions.saveStickers, `${this.authService.getUserUid()}/stickers`, stickers).subscribe(
      (response) => {
        this.loggingService.info('sendSaveStickers: OK; Response: ', response);
      },
      (error) => {
        this.loggingService.warn('sendSaveStickers: Error; Response: ', error);
      }
    );
  }

  sendSaveStickerAndFetch(sticker: Sticker): void {
    this.httpService.sendRequest(StickersActions.saveSticker, `${this.authService.getUserUid()}/stickers/${sticker.id}`, sticker).subscribe(
      (savedSticker: Sticker) => {
        this.addStickerService.add(savedSticker);
        this.loggingService.info('sendSaveStickerAndFetch; OK: added sticker id: ', savedSticker.id);
      },
      (error) => {
        this.loggingService.warn('sendSaveStickerAndFetch; Error: ', error);
      }
    );
  }

  sendDeleteSticker(stickerId: string) {
    this.httpService
      .sendRequest(StickersActions.deleteSticker, `${this.authService.getUserUid()}/stickers/${stickerId}`)
      .subscribe();
  }
}
